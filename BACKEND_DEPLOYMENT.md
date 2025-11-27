
# Backend Deployment Guide - Render.com

## 🚀 Deploy Your FastAPI Backend to Render.com (FREE)

Follow these steps to deploy your ExportSarathi backend:

### Step 1: Sign Up / Login to Render

1. Go to **https://render.com**
2. Click **"Get Started for Free"** or **"Sign In"**
3. Sign in with your **GitHub account** (recommended)

---

### Step 2: Create a New Web Service

1. Once logged in, click **"New +"** button (top right)
2. Select **"Web Service"**
3. Connect your GitHub repository:
   - Click **"Connect account"** if not already connected
   - Search for **"ExportSarathi"**
   - Click **"Connect"** next to your repository

---

### Step 3: Configure the Web Service

Fill in the following settings:

#### Basic Settings:
- **Name**: `exportsarathi-backend` (or any name you prefer)
- **Region**: Choose closest to your users (e.g., Singapore for India)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT**
- **Runtime**: `Python 3`

#### Build & Deploy Settings:
- **Build Command**: 
  ```bash
  pip install -r requirements.txt
  ```

- **Start Command**:
  ```bash
  uvicorn main_simple:app --host 0.0.0.0 --port $PORT
  ```

#### Instance Type:
- Select **"Free"** (Free tier includes 750 hours/month)

---

### Step 4: Add Environment Variables

Scroll down to **"Environment Variables"** section and add:

| Key | Value |
|-----|-------|
| `GOOGLE_API_KEY` | Your Gemini API key (from Google AI Studio) |
| `PYTHON_VERSION` | `3.11.0` (optional, recommended) |

To add each variable:
1. Click **"Add Environment Variable"**
2. Enter the **Key** and **Value**
3. Click **"Add"**

⚠️ **IMPORTANT**: Make sure you have your Google Gemini API key ready!
- Get it from: https://makersuite.google.com/app/apikey

---

### Step 5: Deploy!

1. Click **"Create Web Service"** button at the bottom
2. Wait for the deployment to complete (usually 3-5 minutes)
3. You'll see build logs in real-time

---

### Step 6: Get Your Backend URL

Once deployed successfully:
1. You'll see a URL like: `https://exportsarathi-backend.onrender.com`
2. **Copy this URL** - you'll need it for the frontend!

Test it by visiting:
- `https://your-backend-url.onrender.com/` (should show welcome message)
- `https://your-backend-url.onrender.com/health` (should show health status)

---

### Step 7: Update Frontend Environment Variable

Now connect your frontend to the backend:

1. Go to **Vercel Dashboard**: https://vercel.com
2. Open your **export-sarathi** project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-url.onrender.com` (your Render URL)
   - **Environment**: Select all (Production, Preview, Development)
5. Click **"Save"**
6. Go to **Deployments** tab
7. Click **"Redeploy"** on the latest deployment

---

## ✅ Verification

After both deployments are complete:

1. Visit your frontend: `https://export-sarathi.vercel.app`
2. Try the AI Chat feature
3. Try the Feasibility Checker
4. Everything should work! 🎉

---

## 🔧 Troubleshooting

### Issue: "Application failed to respond"
- **Solution**: Check that the Start Command is correct: `uvicorn main_simple:app --host 0.0.0.0 --port $PORT`
- Make sure `$PORT` is used (Render provides this automatically)

### Issue: "Module not found" errors
- **Solution**: Check that `requirements.txt` is in the `backend` folder
- Verify the Root Directory is set to `backend`

### Issue: "GOOGLE_API_KEY not found"
- **Solution**: Add the environment variable in Render dashboard
- Redeploy after adding the variable

### Issue: CORS errors in frontend
- **Solution**: Already fixed! The backend now allows your Vercel domain

### Issue: Free tier sleeping
- **Note**: Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- This is normal for free tier

---

## 💡 Pro Tips

1. **Monitor Logs**: Use Render's "Logs" tab to debug issues
2. **Auto-Deploy**: Render automatically redeploys when you push to GitHub
3. **Custom Domain**: You can add a custom domain in Render settings (paid plans)
4. **Upgrade**: If you need 24/7 uptime, upgrade to Render's paid plan ($7/month)

---

## 🎯 Next Steps

Once backend is deployed:
- ✅ Test all AI features
- ✅ Test feasibility checker
- ✅ Test document generation
- ✅ Share your app with users!

---

**Need help?** Check Render's documentation: https://render.com/docs
