# Troubleshooting Guide: Adding Pet Functionality on Vercel

## Problem Summary
The "Add Pet" functionality is not working when deployed to Vercel. This guide will help you diagnose and fix the issue.

## ⚠️ Deployment Error: "No entrypoint found"

**Error Message:**
```
No entrypoint found. Searched for: 
- app.{js,cjs,mjs,ts,cts,mts}
- index.{js,cjs,mjs,ts,cts,mts}
- server.{js,cjs,mjs,ts,cts,mts}
```

**What This Means:** Vercel is trying to deploy your frontend React/Vite app as a backend Node.js application. This happens when:
1. You're deploying from the wrong directory (parent folder instead of `client`)
2. Vercel didn't detect the framework correctly
3. Root directory is not configured

**Solution:**

### Option A: Configure Root Directory (Recommended)
1. In Vercel Dashboard, go to your project
2. **Settings** → **General** → Scroll to **"Root Directory"**
3. Click **"Edit"** and enter: `client`
4. Click **"Save"**
5. Go to **Deployments** and click **"Redeploy"**

### Option B: When Creating New Project
1. When importing from GitHub, look for **"Root Directory"**
2. Click **"Edit"** and select `client`
3. Verify **Framework Preset** shows **"Vite"**
4. Build settings should be:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Option C: Use vercel.json
A `vercel.json` file has been created in the client directory with the correct configuration. Commit and push it:
```bash
git add vercel.json
git commit -m "Add Vercel configuration"
git push
```

---

## Common Causes & Solutions

### 1. Missing Environment Variable (Most Common)

**Problem:** The `VITE_API_URL` environment variable is not set in Vercel.

**Solution:**
1. Go to your Vercel project dashboard
2. Click on **Settings** > **Environment Variables**
3. Add the following variable:
   - **Key:** `VITE_API_URL`
   - **Value:** Your backend API URL (e.g., `https://your-backend.vercel.app` or your Express server URL)
4. Click **Save**
5. **IMPORTANT:** After adding environment variables, you MUST redeploy:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Click **Redeploy**

⚠️ **Note:** Vite environment variables (prefixed with `VITE_`) are embedded at **build time**. If you add/change them after deployment, you MUST rebuild/redeploy for changes to take effect.

### 2. CORS Issues

**Problem:** Your backend server is blocking requests from your Vercel frontend domain.

**Solution:** Update your backend CORS configuration:

```javascript
// In your Express server (e.g., index.js or app.js)
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174', 
    'https://your-vercel-app.vercel.app' // Add your Vercel domain
  ],
  credentials: true
}));
```

### 3. API Endpoint Not Found (404)

**Problem:** The backend endpoint `/listings` doesn't exist or has a typo.

**Solution:** Verify your backend routes:
- Check that you have a POST route defined: `app.post('/listings', ...)`
- Ensure the route is correctly spelled
- Test the endpoint using Postman or similar tool

### 4. Network Request Timeout

**Problem:** The request is taking too long and timing out.

**Solution:**
- Check if your backend server is running
- Verify the backend URL is correct
- Check serverless function timeout settings in Vercel (default is 10s for free tier)

### 5. Database Connection Issues

**Problem:** Backend can't connect to MongoDB.

**Solution:**
- Ensure MongoDB Atlas allows connections from all IPs (0.0.0.0/0) for serverless deployments
- Verify your `DB_URI` environment variable in the backend
- Check MongoDB Atlas connection logs

## Debugging Steps

### Step 1: Check Browser Console
1. Open your deployed site on Vercel
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Try adding a pet
5. Look for error messages (they should now appear thanks to the error handling we added)

### Step 2: Check Network Tab
1. In Developer Tools, go to **Network** tab
2. Try adding a pet
3. Find the `/listings` request
4. Check:
   - **Status Code:** Should be 200 or 201 for success
   - **Response:** See what the server is returning
   - **Headers:** Check if the `VITE_API_URL` is correct in the Request URL

### Step 3: Verify Environment Variables
1. In your local `.env` file, ensure you have:
   ```
   VITE_API_URL=http://localhost:5000
   ```
2. In Vercel dashboard, ensure you have:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Step 4: Test Locally First
```bash
# Run backend
cd server
npm install
nodemon index.js

# Run frontend (in another terminal)
cd client
npm install
npm run dev
```

Try adding a pet locally. If it works locally but not on Vercel, it's definitely an environment variable or CORS issue.

## Code Changes Made

### Added Error Handling in AddListing.jsx
```javascript
axios.post(`${import.meta.env.VITE_API_URL}/listings`, listingData)
    .then(res => {
        if(res.data.insertedId){
            toast.success('Listing Added Successfully');
            reset();
        }
    })
    .catch(error => {
        console.error('Error adding listing:', error);
        toast.error(error.response?.data?.message || 'Failed to add listing. Please try again.');
    });
```

**What this does:**
- Catches any errors that occur during the API request
- Logs detailed error information to the console
- Shows a user-friendly error message via toast notification

## Quick Checklist

- [ ] `VITE_API_URL` is set in Vercel environment variables
- [ ] Vercel app has been redeployed after adding environment variables
- [ ] Backend CORS allows your Vercel domain
- [ ] Backend server is running and accessible
- [ ] MongoDB connection is working
- [ ] `/listings` POST route exists in backend
- [ ] Browser console shows no errors
- [ ] Network tab shows successful requests

## Still Not Working?

If you've tried everything above and it's still not working:

1. **Share the error message** from the browser console
2. **Check the Network tab** and share:
   - The request URL
   - The response status code
   - The response body
3. **Verify your backend** is deployed and running
4. **Test the API directly** using a tool like Postman or curl:
   ```bash
   curl -X POST https://your-backend-url.com/listings \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Pet","category":"Pets","price":0,"date":"2025-12-10","location":"Dhaka","image":"https://example.com/image.jpg","description":"Test","email":"test@example.com"}'
   ```

## Additional Resources

- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Vercel Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)
- [Debugging on Vercel](https://vercel.com/docs/concepts/deployments/troubleshoot-a-build)
