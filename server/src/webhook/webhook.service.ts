import { Injectable } from '@nestjs/common';
import * as line from '@line/bot-sdk';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookService {
    constructor(private prismaService: PrismaService) { }

    private readonly config: any = {
        channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
        channelSecret: process.env.LINE_CHANNEL_SECRET,
    };

    async replyMessage(event: any) {
        const client = new line.Client(this.config);
        const replyToken = event.originalDetectIntentRequest.payload.data.replyToken;
        if (event.queryResult.intent.displayName === 'missingItem') {
            const dataItem = await this.prismaService.missingItem.findMany({
                where: {
                    statusMissing_id: 1
                },
                take: 9,
            });
            const customData = dataItem.map((item): line.TemplateColumn => (
                {
                    "thumbnailImageUrl": item.imageItem.replace('http', 'https'),
                    "text": item.title,
                    "actions": [
                        {
                            "type": "message",
                            "label": "รายละเอียด",
                            "text": "Action 1"
                        },
                    ],
                    "imageBackgroundColor": "#FFFFFF"
                }
            ))
            // return 'ok';
            // await client.replyMessage(replyToken, {
            //     "type": "text",
            //     "text": `รายการของหาย ${customData.length} รายการล่าสุด หากต้องการดูข้อมูลทั้งหมดสามารถเข้าไปดูได้ใน Website`
            // });
            await client.replyMessage(replyToken, 
                {
                "type": "template",
                "altText": "this is a carousel template",
                "template": {
                    "type": "carousel",
                    "imageSize": "cover",
                    "columns": customData,
                }
            });
            return 'ok';
        }else if (event.queryResult.intent.displayName === 'losingItem') {
            const dataItem = await this.prismaService.losingItem.findMany({
                where: {
                    statusLosingItem_id: 1
                },
                take: 9,
            });
            const customData = dataItem.map((item): line.TemplateColumn => (
                {
                    "thumbnailImageUrl": item.imageItem !== null ? item.imageItem.replace('http', 'https') : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
                    "text": item.title,
                    "actions": [
                        {
                            "type": "message",
                            "label": "รายละเอียด",
                            "text": "Action 1"
                        },
                    ],
                    "imageBackgroundColor": "#FFFFFF"
                }
            ))
            // return 'ok';
            // await client.replyMessage(replyToken, {
            //     "type": "text",
            //     "text": `รายการของหาย ${customData.length} รายการล่าสุด หากต้องการดูข้อมูลทั้งหมดสามารถเข้าไปดูได้ใน Website`
            // });
            await client.replyMessage(replyToken, 
                {
                "type": "template",
                "altText": "this is a carousel template",
                "template": {
                    "type": "carousel",
                    "imageSize": "cover",
                    "columns": customData,
                }
            });
            return 'ok';
        }
    }
}
