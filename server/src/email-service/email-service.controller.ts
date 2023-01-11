import { Controller, Post } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';


@Controller('email-service')
export class EmailServiceController {
    constructor(private readonly emailService: EmailServiceService) {}

    @Post('sendEmail')
    sendEmail() {
        return this.emailService.sendEmail()
    }
}
