import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const inputLogo = path.resolve('public/images/other/logo.png');
  const publicDir = path.resolve('public');

  console.log('Reading input logo from:', inputLogo);

  // 1. Create a 512x512 high-res favicon with dark brand background (#0a0a0c)
  // This ensures high contrast on Google Search (white background) and all browser tabs.
  // The logo itself is 476x422, so we scale it neatly with margin into 512x512.
  const logoBuffer = await sharp(inputLogo)
    .resize(440, 440, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toBuffer();

  const favicon512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 10, g: 10, b: 12, alpha: 1 } // Brand #0a0a0c
    }
  })
    .composite([
      {
        input: logoBuffer,
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  // Save public/favicon.png (512x512)
  const faviconPath = path.join(publicDir, 'favicon.png');
  fs.writeFileSync(faviconPath, favicon512);
  console.log('Created:', faviconPath);

  // Save public/apple-touch-icon.png (180x180)
  const appleTouchPath = path.join(publicDir, 'apple-touch-icon.png');
  await sharp(favicon512)
    .resize(180, 180)
    .png()
    .toFile(appleTouchPath);
  console.log('Created:', appleTouchPath);

  // Save 48x48, 32x32, 16x16 standard PNGs
  const favicon48Path = path.join(publicDir, 'favicon-48x48.png');
  await sharp(favicon512)
    .resize(48, 48)
    .png()
    .toFile(favicon48Path);
  console.log('Created:', favicon48Path);

  const favicon32Path = path.join(publicDir, 'favicon-32x32.png');
  await sharp(favicon512)
    .resize(32, 32)
    .png()
    .toFile(favicon32Path);
  console.log('Created:', favicon32Path);

  // Save public/favicon.ico (32x32 PNG container or standard ico format)
  const faviconIcoPath = path.join(publicDir, 'favicon.ico');
  await sharp(favicon512)
    .resize(32, 32)
    .toFile(faviconIcoPath);
  console.log('Created:', faviconIcoPath);

  console.log('All favicons successfully generated!');
}

generateFavicons().catch((err) => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
