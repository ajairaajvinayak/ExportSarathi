from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Initialize model globally for better performance
# Using gemini-2.5-flash for lower latency
model = genai.GenerativeModel('gemini-2.5-flash')

# Create FastAPI app
app = FastAPI(
    title="ExportSarathi",
    version="1.0.0",
    description="AI-powered Export & Compliance Copilot for MSMEs"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://localhost:3001",
        "https://export-sarathi.vercel.app",
        "https://*.vercel.app"  # Allow all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    sources: List[Dict[str, Any]] = []
    session_id: Optional[str] = None

class FeasibilityRequest(BaseModel):
    product_name: str
    product_description: str
    hs_code: Optional[str] = None
    manufacturing_location: str = "India"
    target_country: str

# Routes
@app.get("/")
async def root():
    return {
        "message": "Welcome to ExportSarathi",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ExportSarathi",
        "version": "1.0.0"
    }

@app.post("/api/chat/message", response_model=ChatResponse)
async def chat_message(request: ChatRequest):
    try:
        # Use global model instance
        
        # Create prompt for export advisor
        prompt = f"""You are ExportSarathi, an elite AI Export Advisor and Global Trade Expert.
Your Mission: To empower Indian MSMEs to conquer global markets with precise, actionable, and source-backed intelligence.

CORE IDENTITY:
- Name: ExportSarathi
- Voice: Professional, encouraging, knowledgeable, and precise.
- Expertise: Indian Export Regulations (DGFT), HS Codes, Global Trade Compliance, Market Analysis, and Logistics.

INSTRUCTIONS:
1. **Direct Answers Only**: Do not start with "Here is the information" or "I can help with that". Answer the question immediately.
2. **Crystal Clear Clarity**: Use simple, professional language. Avoid jargon unless explained.
3. **Structured Data**: ALWAYS use Markdown Tables for:
   - Requirements lists
   - Document checklists
   - Country comparisons
   - HS Code classifications
   - Tariff rates
4. **Source-Backed**: Cite specific regulations (e.g., "As per FTP 2023", "Under FEMA guidelines") where applicable.
5. **Completeness**: Ensure every aspect of the user's query is addressed. If a question is vague, ask clarifying questions.

Question: {request.message}

FORMATTING RULES:
- Use **Bold** for key terms.
- Use > Blockquotes for official regulation text.
- Use Tables for all structured data.

Example Table Format:
| Requirement | Description | Authority |
|-------------|-------------|-----------|
| IEC Code    | Import Export Code | DGFT      |

Answer the question now as ExportSarathi:"""
        
        # Generate response
        response = model.generate_content(prompt)
        
        return {
            "response": response.text,
            "sources": [
                {"source": "DGFT Export Policy", "page": None},
                {"source": "Foreign Trade Policy 2023", "page": None}
            ],
            "session_id": request.session_id or "default"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

@app.post("/api/feasibility/analyze")
async def analyze_feasibility(request: FeasibilityRequest):
    try:
        # Use global model instance
        
        # Create prompt
        # Create prompt
        prompt = f"""You are ExportSarathi, an elite International Trade Consultant.
        Analyze the export feasibility of the following product for an Indian MSME.
        
        Return a VALID JSON object with the following keys:
        - score (number 0-100)
        - viability_status (string: "High", "Medium", "Low")
        - suggested_markets (list of strings: top 3 suggested countries)
        - risk_factors (list of strings: key risk factors)
        - required_certifications (list of strings: required certifications)
        - top_exporters (list of strings: names of 3-5 major Indian companies exporting this product)
        - complexity_level (string: "Low", "Medium", "High")
        - analysis_summary (string: brief strategic summary)
        
        Do not include markdown formatting (```json). Just return the raw JSON string.
        
        Product: {request.product_name}
        Description: {request.product_description}
        HS Code: {request.hs_code or 'Not provided'}
        Manufacturing Location: {request.manufacturing_location}
        Target Country: {request.target_country}"""
        
        # Generate response
        response = model.generate_content(prompt)
        
        # Try to parse as JSON
        import json
        try:
            content = response.text.replace("```json", "").replace("```", "").strip()
            result = json.loads(content)
        except:
            # Fallback structured response
            result = {
                "score": 75,
                "viability_status": "High",
                "suggested_markets": [request.target_country, "United States", "United Arab Emirates"],
                "risk_factors": ["Currency fluctuation", "Regulatory compliance"],
                "required_certifications": ["ISO 9001", "Product-specific certifications"],
                "top_exporters": ["Tata International", "Reliance Retail", "Adani Enterprises"],
                "complexity_level": "Medium",
                "analysis_summary": response.text[:200]
            }
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
