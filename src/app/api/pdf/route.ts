import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { data }: { data: string } = await req.json();

        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();

        // Add a page to the document
        const page = pdfDoc.addPage([595, 842]); // A4 size (595 x 842 points)

        // Embed a standard font
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Set font size and draw text on the page
        const fontSize = 12;
        page.drawText(data, {
            x: 50,
            y: 800, // Start drawing at the top of the page
            size: fontSize,
            font,
            color: rgb(0, 0, 0), // Black text
        });

        // Serialize the document to bytes (Buffer)
        const pdfBytes = await pdfDoc.save();

        // Return the generated PDF as a response
        return new NextResponse(Buffer.from(pdfBytes), {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="output.pdf"',
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({ success: false, message: 'Method Not Allowed' }, { status: 405 });
}
