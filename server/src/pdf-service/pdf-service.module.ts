import { Module } from '@nestjs/common';
import { PdfServiceController } from './pdf-service.controller';
import { PdfServiceService } from './pdf-service.service';

@Module({
  controllers: [PdfServiceController],
  providers: [PdfServiceService],
})
export class PdfServiceModule {}
