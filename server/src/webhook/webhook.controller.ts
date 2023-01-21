import { Controller, Post , Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
    constructor(private readonly webhookService: WebhookService) {}


    @Post()
    async handleWebhook(
        @Req() req: Request,
    ) {
        const data = req.body;
        return this.webhookService.replyMessage(data);
    }

    @Get()
    async getTest() {
        return 'test';
    }
}
