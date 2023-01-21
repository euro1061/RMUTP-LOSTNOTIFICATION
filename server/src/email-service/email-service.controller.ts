import { Controller, Post, Body } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { sendMailDto } from './dto';


@Controller('email-service')
export class EmailServiceController {
    constructor(private readonly emailService: EmailServiceService) {}

    @Post('sendEmail')
    sendEmail(
        @Body() dto: sendMailDto,
    ) {
        // return headers;
        return this.emailService.sendEmail(dto)
    }
}
