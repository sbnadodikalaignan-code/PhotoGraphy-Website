# Stories by Nadodikalaignan - Website Admin & Maintenance Guide

## 1. Overview
The website has a built-in, **zero-backend, zero-database** Admin Panel designed with a clean, modern, pure white background (`#ffffff`). It allows non-technical team members and photographers to add and remove images across all sections of **`www.nadodikalaignan.com`** using direct **Cloudflare R2** URLs (`https://media.nadodikalaignan.com/...`).

---

## 2. Accessing the Admin Panel
- **URL**: `https://www.nadodikalaignan.com/admin` (or `http://localhost:5173/admin` during development)
- **Security PIN**: `1234` (or `admin`)

---

## 3. Managed Sections
You can add and remove images across every section of the website:

1. **Hero Slider** (Homepage banner carousel)
   - Add new slide images, titles, and taglines.
   - Remove unwanted slides with one click.
2. **Latest Work** (Homepage featured portfolio grid)
   - Add photos with title, category tag, location, and aspect ratio (*tall* portrait or *wide* landscape).
   - Remove portfolio cards with instant deletion.
3. **About Preview Cards** (Homepage 4 service cards)
   - Update cover images for Weddings, Events, Portraits, and Toddlers.
4. **Weddings Gallery** (`/work/weddings`)
   - Update top hero banner photo.
   - Add or remove wedding ceremony, candid, and couple portraits.
5. **Events Gallery** (`/work/events`)
   - Update hero banner photo.
   - Add or remove haldi, sangeet, reception, and celebration photos.
6. **Portraits Gallery** (`/work/portraits`)
   - Update hero banner photo.
   - Add or remove fine-art and studio portrait photos.
7. **Toddlers & Baby Gallery** (`/work/toddlers`)
   - Update hero banner photo.
   - Add or remove newborn, milestone, and cake smash photos.
8. **Pre-Wedding Gallery** (`/work/pre-wedding`)
   - Update hero banner and add/remove scenic outdoor photos.
9. **Films & Albums** (`/wedding-films`)
   - Manage photos and covers inside individual story albums (*Gloria & Vishnu*, *Preethika & Dillon*, *Gowtham & Abhinandana*, *Sowmika*, *Candid Moments*).

---

## 4. How to Add a Photo (Client Guide - 3 Simple Steps)

1. Open `/admin` and select the tab for your section (e.g. **Weddings**).
2. In the **Cloudflare Image URL** input, paste your media link:
   ```
   https://media.nadodikalaignan.com/images/WEEDING/your_new_photo.webp
   ```
3. A **Live Image Preview** will appear immediately on screen so you can verify that the image loads properly.
4. Optionally enter a **Title** and **Category**, then click the black button:  
   **"+ Add Photo to Gallery"**

---

## 5. How to Remove a Photo
- Scroll through the gallery cards in any section.
- Click the red **"Remove"** button on the bottom of any photo card.
- Confirm the popup prompt, and the photo is deleted immediately.

---

## 6. How Changes Go Live to `www.nadodikalaignan.com`

### Method A: 1-Click Live Publishing (Zero Backend, 100% Automated)
1. At the top of `/admin`, click the green button:  
   🚀 **"Publish Live Worldwide"**
2. The browser securely commits the updated data to your GitHub repository (`sbnadodikalaignan-code/PhotoGraphy-Website`).
3. Your hosting provider (Cloudflare Pages / Vercel) automatically detects the commit, builds the project, and updates **`www.nadodikalaignan.com`** live across the world in **~45 to 60 seconds**!

#### One-Time Setup for Live Publishing:
- In the top header of `/admin`, click **"GitHub Sync"**.
- Paste your GitHub Personal Access Token (classic or fine-grained with `repo` / `Contents: Write` permissions).
- Click **"Save Settings"**. The token is saved in your browser and you never have to enter it again!

---

### Method B: Manual Git Commit (Alternative)
- In the Admin Panel, click **"Export Backup"** to download `siteContent_YYYY-MM-DD.json`.
- Replace `src/data/siteContent.json` in your project folder.
- Run `git add .`, `git commit -m "Update website media"`, and `git push`.

---

### Method C: Reset to Defaults
- If you ever make a mistake or want to restore original website photos, click **"Reset Defaults"** in the Admin Panel header to restore all sections instantly.

---

## 7. Cloudflare Media URL Conventions
All images and videos are streamed from the Cloudflare R2 bucket: `https://media.nadodikalaignan.com/images/`

Common path folders:
- **Hero Slider**: `/images/HEROSEACTIONIMAGE/1.webp` ... `9.webp`
- **Latest Work**: `/images/latest_image/...`
- **Weddings**: `/images/WEEDING/...`
- **Events**: `/images/events seaction/...`
- **Portraits**: `/images/protrate/...`
- **Toddlers**: `/images/BABYIMAGE/...`
- **Thumbnails**: `/images/thumbnail/...`
- **Videos (HLS)**: `/images/VIDEO/.../video.m3u8`

