from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
import os
from datetime import datetime
from app.schemas.schemas import DocumentRequest

class DocumentService:
    def __init__(self):
        self.output_dir = "generated_docs"
        if not os.path.exists(self.output_dir):
            os.makedirs(self.output_dir)

    async def generate_invoice(self, data: DocumentRequest) -> str:
        """Generate Commercial Invoice PDF"""
        filename = f"invoice_{datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        filepath = os.path.join(self.output_dir, filename)
        
        doc = SimpleDocTemplate(filepath, pagesize=letter)
        elements = []
        styles = getSampleStyleSheet()
        
        # Header
        elements.append(Paragraph("COMMERCIAL INVOICE", styles['Title']))
        elements.append(Spacer(1, 20))
        
        # Exporter & Importer Details
        data_table = [
            ["Exporter", "Importer"],
            [self._format_address(data.exporter_details), self._format_address(data.importer_details)]
        ]
        
        t = Table(data_table, colWidths=[250, 250])
        t.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('PADDING', (0, 0), (-1, -1), 10),
        ]))
        elements.append(t)
        elements.append(Spacer(1, 20))
        
        # Product Details
        prod_data = [["Description", "HS Code", "Quantity", "Unit Price", "Total"]]
        
        total_amount = 0
        for item in data.product_details:
            amount = item['quantity'] * item['unit_price']
            total_amount += amount
            prod_data.append([
                item['description'],
                item.get('hs_code', ''),
                str(item['quantity']),
                f"${item['unit_price']:.2f}",
                f"${amount:.2f}"
            ])
            
        prod_data.append(["", "", "", "TOTAL", f"${total_amount:.2f}"])
        
        t2 = Table(prod_data, colWidths=[200, 80, 60, 80, 80])
        t2.setStyle(TableStyle([
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ]))
        elements.append(t2)
        
        # Build PDF
        doc.build(elements)
        
        return filepath

    def _format_address(self, details):
        return f"{details.get('name', '')}\n{details.get('address', '')}\n{details.get('country', '')}"
