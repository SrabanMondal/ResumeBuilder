import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { data }: { data: string } = await req.json();

        // Launch Puppeteer with a serverless-compatible Chromium binary
        const browser = await puppeteer.launch({
            executablePath: await chromium.executablePath(),
            args: chromium.args,
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        // Set the HTML content
        await page.setContent(data, { waitUntil: 'networkidle0' });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        // Return the PDF
        return new NextResponse(pdfBuffer, {
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
