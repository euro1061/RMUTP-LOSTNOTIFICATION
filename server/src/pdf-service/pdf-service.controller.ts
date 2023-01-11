import { Controller, Post, Res, Body } from '@nestjs/common';
import { PdfServiceService } from './pdf-service.service';

@Controller('pdf-service')
export class PdfServiceController {
    constructor(
        private pdfService: PdfServiceService,
    ) { }

    @Post('missing')
    // @Header('application/pdf', 'text/html')
    async createPdf(@Res() res: any, @Body('data') data: any) {

        const pdfBuffer = await this.pdfService.createPdf(data);
        res.attachment('my-pdf.pdf');
        res.send(pdfBuffer);
    }

    @Post('losing')
    // @Header('application/pdf', 'text/html')
    async createPdfLosing(@Res() res: any, @Body('data') data: any) {
        const pdfBuffer = await this.pdfService.createPdfLosing(data);
        res.attachment('my-pdf.pdf');
        res.send(pdfBuffer);
    }
}
