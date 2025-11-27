# Deployment Guide for ExportSarathi

## 🚀 Deployment Architecture

This is a **full-stack application** with separate frontend and backend components:
- **Frontend**: Next.js (React) application
- **Backend**: FastAPI (Python) application with AI capabilities

## 📋 Deployment Options

### Option 1: Separate Deployments (Recommended)

#### A. Frontend Deployment (Vercel)

1. **Update Vercel Project Settings**:
   - Go to your Vercel project settings
   - Under "Build & Development Settings":
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `.next`
     - **Install Command**: `npm install`

2. **Set Environment Variables** in Vercel:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

3. **Redeploy** the project

#### B. Backend Deployment Options

**Option B1: Deploy to Render.com (Free tier available)**

1. Go to [Render.com](https://render.com)
2. Create a new "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main_simple:app --host 0.0.0.0 --port $PORT`
   - **Environment**: Python 3
5. Add Environment Variables:
   ```
   GOOGLE_API_KEY=your_gemini_api_key
   ```

**Option B2: Deploy to Railway.app**

1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main_simple:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables

**Option B3: Deploy to Python Anywhere**

1. Go to [PythonAnywhere.com](https://www.pythonanywhere.com)
2. Upload your backend code
3. Configure WSGI file
4. Set up environment variables

#### C. Connect Frontend to Backend

After deploying the backend, update your frontend's API URL:

1. In Vercel, go to Settings → Environment Variables
2. Add/Update:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```
3. Redeploy the frontend

---

### Option 2: Monorepo Deployment (Advanced)

If you want to deploy both on Vercel, you'll need to:

1. **Use Vercel Serverless Functions** for the backend
2. Convert FastAPI routes to Vercel serverless functions
3. This requires significant restructuring

---

## 🔧 Quick Fix for Current Vercel Deployment

### Step 1: Update Vercel Settings

Go to your Vercel project → Settings → General:

1. **Root Directory**: Change to `frontend`
2. Click "Save"

### Step 2: Redeploy

Go to Deployments → Click the three dots on the latest deployment → "Redeploy"

---

## 📝 Important Notes

1. **Backend Deployment is Required**: The frontend alone won't work because it needs the AI backend API
2. **Environment Variables**: Make sure to set `GOOGLE_API_KEY` in your backend deployment
3. **CORS Configuration**: Ensure your backend allows requests from your Vercel frontend URL
4. **Database**: If using SQLite, consider migrating to PostgreSQL for production

---

## 🆘 Troubleshooting

### Error: "404 NOT_FOUND"
- **Cause**: Vercel is looking for Next.js app in root directory
- **Fix**: Set Root Directory to `frontend` in Vercel settings

### Error: "API calls failing"
- **Cause**: Backend not deployed or CORS issues
- **Fix**: Deploy backend separately and configure CORS

### Error: "Build failed"
- **Cause**: Missing dependencies or wrong build command
- **Fix**: Check build logs and ensure correct root directory

---

## 🎯 Recommended Deployment Strategy

1. ✅ **Frontend**: Vercel (free tier)
2. ✅ **Backend**: Render.com or Railway.app (free tier)
3. ✅ **Database**: Neon.tech or Supabase (free PostgreSQL)

This gives you a completely free, production-ready deployment!
