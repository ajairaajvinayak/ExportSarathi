import os
from typing import List, Dict, Any
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from app.core.config import settings

class VectorStoreService:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=settings.GOOGLE_API_KEY
        )
        self.persist_directory = settings.CHROMA_PERSIST_DIRECTORY
        self.vector_db = None

    async def initialize(self):
        """Initialize the vector store"""
        if not os.path.exists(self.persist_directory):
            os.makedirs(self.persist_directory)
            
        self.vector_db = Chroma(
            persist_directory=self.persist_directory,
            embedding_function=self.embeddings
        )

    async def add_documents(self, documents: List[Dict[str, Any]]):
        """Add documents to the vector store"""
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        
        docs = []
        for doc in documents:
            content = doc.get("content", "")
            metadata = doc.get("metadata", {})
            
            # Create Document objects
            split_docs = text_splitter.create_documents(
                texts=[content],
                metadatas=[metadata]
            )
            docs.extend(split_docs)
            
        if docs:
            self.vector_db.add_documents(docs)
            self.vector_db.persist()

    async def search(self, query: str, k: int = 4) -> List[Document]:
        """Search for relevant documents"""
        if not self.vector_db:
            await self.initialize()
            
        return self.vector_db.similarity_search(query, k=k)

    async def get_retriever(self):
        """Get retriever interface"""
        if not self.vector_db:
            await self.initialize()
            
        return self.vector_db.as_retriever()
