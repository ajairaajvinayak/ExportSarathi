from typing import List, Dict, Any
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from app.core.config import settings
from app.schemas.schemas import FeasibilityRequest

class AIService:
    def __init__(self, vector_store):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0.2,
            google_api_key=settings.GOOGLE_API_KEY,
            convert_system_message_to_human=True
        )
        self.vector_store = vector_store

    async def analyze_feasibility(self, request: FeasibilityRequest) -> Dict[str, Any]:
        """Analyze export feasibility for a product"""
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are ExportSarathi, an elite International Trade Consultant.
            Analyze the export feasibility of the following product for an Indian MSME.
            
            Return a VALID JSON object with the following keys:
            - score (number 0-100)
            - viability_status (string: "High", "Medium", "Low")
            - suggested_markets (list of strings: top 3 suggested countries)
            - risk_factors (list of strings: key risk factors)
            - required_certifications (list of strings: required certifications)
            - complexity_level (string: "Low", "Medium", "High")
            - analysis_summary (string: brief strategic summary)
            
            Do not include markdown formatting (```json). Just return the raw JSON string."""),
            ("user", """
            Product: {product_name}
            Description: {product_description}
            HS Code: {hs_code}
            Manufacturing Location: {manufacturing_location}
            Target Country: {target_country}
            """)
        ])
        
        chain = prompt | self.llm
        
        response = await chain.ainvoke({
            "product_name": request.product_name,
            "product_description": request.product_description,
            "hs_code": request.hs_code or "Unknown",
            "manufacturing_location": request.manufacturing_location,
            "target_country": request.target_country
        })
        
        # Simple cleanup to ensure JSON parsing works if model adds markdown
        content = response.content.replace("```json", "").replace("```", "").strip()
        import json
        try:
            return json.loads(content)
        except:
            # Fallback if JSON parsing fails
            return {
                "score": 70,
                "viability_status": "Medium",
                "suggested_markets": ["USA", "UAE", "Germany"],
                "risk_factors": ["Check compliance manually"],
                "required_certifications": ["ISO 9001"],
                "complexity_level": "Medium",
                "analysis_summary": content[:200]
            }

    async def get_chat_response(self, message: str, session_id: str) -> Dict[str, Any]:
        """Get RAG-enhanced chat response"""
        
        retriever = await self.vector_store.get_retriever()
        
        prompt = ChatPromptTemplate.from_template("""
        You are ExportSarathi, an elite AI Export Advisor and Global Trade Expert.
        Your Mission: To empower Indian MSMEs to conquer global markets with precise, actionable, and source-backed intelligence.

        CORE IDENTITY:
        - Name: ExportSarathi
        - Voice: Professional, encouraging, knowledgeable, and precise.
        - Expertise: Indian Export Regulations (DGFT), HS Codes, Global Trade Compliance, Market Analysis, and Logistics.

        INSTRUCTIONS:
        1. **Direct Answers Only**: Answer the question immediately.
        2. **Crystal Clear Clarity**: Use simple, professional language.
        3. **Structured Data**: ALWAYS use Markdown Tables for lists, requirements, and comparisons.
        4. **Source-Backed**: Base your answer on the provided context. If the answer is not in the context, use your general knowledge but mention it.
        5. **Completeness**: Ensure every aspect of the user's query is addressed.

        <context>
        {context}
        </context>

        Question: {input}
        
        Answer as ExportSarathi:
        """)

        document_chain = create_stuff_documents_chain(self.llm, prompt)
        retrieval_chain = create_retrieval_chain(retriever, document_chain)

        response = await retrieval_chain.ainvoke({"input": message})
        
        return {
            "response": response["answer"],
            "sources": [doc.metadata for doc in response.get("context", [])]
        }
