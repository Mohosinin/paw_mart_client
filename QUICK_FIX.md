# Quick Fix: Add Pet Not Working on Vercel

## The Problem
When you deploy to Vercel, adding pets/listings doesn't work, but it works fine locally.

## The Solution (90% of cases)

### You're missing the `VITE_API_URL` environment variable in Vercel!

## Fix It in 3 Steps:

### 1️⃣ Add Environment Variable
1. Go to [vercel.com](https://vercel.com) → Your Project
2. Click **Settings** → **Environment Variables**
3. Add this:
   ```
   Name:  VITE_API_URL
   Value: https://your-backend-api-url.com
   ```
   (Replace with your actual backend URL)

### 2️⃣ Redeploy
1. Go to **Deployments** tab
2. Click the **...** menu on the latest deployment
3. Click **Redeploy**

### 3️⃣ Test
1. Open your Vercel app
2. Try adding a pet
3. ✅ Should work now!

---

## Still Not Working?

### Check the Browser Console
1. Press `F12` on your deployed site
2. Go to **Console** tab
3. Try adding a pet
4. Look for error messages - they'll tell you what's wrong!

### Common Error Messages and Fixes:

| Error | Fix |
|-------|-----|
| `undefined/listings` in Network tab | `VITE_API_URL` not set or you didn't redeploy |
| `CORS error` | Add your Vercel domain to backend CORS config |
| `Failed to fetch` | Backend is not running or URL is wrong |
| `500 Internal Server Error` | Backend error, check backend logs |
| `401 Unauthorized` | Firebase auth issue |

---

## Why Does This Happen?

Vite environment variables (starting with `VITE_`) are embedded into your code **at build time**. 

- ❌ Adding env vars after deployment = they're not in the build
- ✅ Adding env vars + redeploying = they're embedded in the new build

---

## Need More Help?

See `TROUBLESHOOTING.md` for detailed debugging steps.

---

**Last Updated:** December 7, 2025
