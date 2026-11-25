/**
 * Cloudflare R2 Direct Upload Utility
 * Uses AWS Signature V4 to sign PUT requests directly from the browser.
 * No backend required — credentials live in Vite env vars.
 */

const R2_ENDPOINT = import.meta.env.VITE_R2_ENDPOINT; // e.g. https://ACCOUNT.r2.cloudflarestorage.com
const R2_BUCKET   = import.meta.env.VITE_R2_BUCKET;    // e.g. photography-assets
const ACCESS_KEY  = import.meta.env.VITE_R2_ACCESS_KEY_ID;
const SECRET_KEY  = import.meta.env.VITE_R2_SECRET_ACCESS_KEY;
const PUBLIC_URL  = import.meta.env.VITE_R2_PUBLIC_URL; // e.g. https://media.nadodikalaignan.com

// ── Helpers ──────────────────────────────────────────────────────────────────

function hex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sha256(message) {
  const encoder = new TextEncoder();
  const data = typeof message === 'string' ? encoder.encode(message) : message;
  return crypto.subtle.digest('SHA-256', data);
}

async function hmac(key, message) {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', typeof key === 'string' ? encoder.encode(key) : key,
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  return crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
}

function formatDate(date) {
  return date.toISOString().replace(/[:\-]|\.\d{3}/g, '').substring(0, 15) + 'Z';
}

function formatDateShort(date) {
  return date.toISOString().substring(0, 10).replace(/-/g, '');
}

function encodePath(path) {
  return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
}

// ── Signing ───────────────────────────────────────────────────────────────────

async function getSigningKey(dateStamp, region, service) {
  const kDate    = await hmac('AWS4' + SECRET_KEY, dateStamp);
  const kRegion  = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, 'aws4_request');
  return kSigning;
}

/**
 * Upload a File directly to Cloudflare R2.
 * @param {File} file - Browser File object
 * @param {string} folder - e.g. 'images/WEEDING' or 'images/HEROSEACTIONIMAGE'
 * @param {function} onProgress - (percent: number) => void
 * @returns {Promise<string>} Public URL of the uploaded file
 */
export async function uploadToR2(file, folder, onProgress) {
  if (!R2_ENDPOINT || !R2_BUCKET || !ACCESS_KEY || !SECRET_KEY) {
    throw new Error('R2 credentials are not configured in .env');
  }

  const region  = 'auto';
  const service = 's3';
  const now     = new Date();
  const amzDate  = formatDate(now);
  const dateStamp = formatDateShort(now);

  // Build a clean file key preserving original name (sanitized) + timestamp
  const ext = file.name.split('.').pop().toLowerCase();
  const rawBaseName = file.name.replace(/\.[^.]+$/, '');
  const sanitizedBase = rawBaseName.replace(/[^a-zA-Z0-9_\-]/g, '_').replace(/_+/g, '_');
  const key = `${folder}/${sanitizedBase}_${Date.now()}.${ext}`;

  // AWS SigV4 Canonical Path must encode every segment
  const encodedPath = `/${R2_BUCKET}/${encodePath(key)}`;
  const url = `${R2_ENDPOINT}${encodedPath}`;
  const host = new URL(R2_ENDPOINT).host;

  // Payload hash
  const fileBuffer = await file.arrayBuffer();
  const payloadHash = hex(await sha256(fileBuffer));

  // Canonical headers (must be sorted alphabetically)
  const contentType = file.type || 'application/octet-stream';
  const canonicalHeaders = [
    `content-type:${contentType}`,
    `host:${host}`,
    `x-amz-content-sha256:${payloadHash}`,
    `x-amz-date:${amzDate}`,
  ].join('\n') + '\n';

  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    'PUT',
    encodedPath,
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    hex(await sha256(canonicalRequest)),
  ].join('\n');

  const signingKey = await getSigningKey(dateStamp, region, service);
  const signature  = hex(await hmac(signingKey, stringToSign));

  const authHeader = [
    `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}`,
    `SignedHeaders=${signedHeaders}`,
    `Signature=${signature}`,
  ].join(', ');

  // Upload with XHR for real-time progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.setRequestHeader('x-amz-content-sha256', payloadHash);
    xhr.setRequestHeader('x-amz-date', amzDate);
    xhr.setRequestHeader('Authorization', authHeader);

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      });
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Return full public media URL (e.g. https://media.nadodikalaignan.com/images/...)
        const publicUrl = `${PUBLIC_URL}/${encodePath(key)}`;
        resolve(publicUrl);
      } else {
        reject(new Error(`R2 upload failed: ${xhr.status} ${xhr.statusText}\n${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during R2 upload. Please verify R2 bucket CORS settings.'));
    xhr.send(fileBuffer);
  });
}
