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
            const customData = dataItem.map((item): line.TemplateColumn => {
                let splitImageItem = item.imageItem.split("/")
                if(item.title.includes("บัตร")) {
                    splitImageItem[6] = "w_1000,h_1500,c_scale,e_blur:1500"
                }
                
                return {
                    "thumbnailImageUrl": splitImageItem.join('/').replace('http', 'https'),
                    "text": item.title,
                    "actions": [
                        {
                            "type": "uri",
                            "label": "รายละเอียด",
                            "uri": `${process.env.CLIENT_HOST}/infomissingitem/${item.id}`
                        },
                    ],
                    "imageBackgroundColor": "#FFFFFF"
                }
            })
            // return 'ok';
            // await client.replyMessage(replyToken, {
            //     "type": "text",
            //     "text": `รายการของหาย ${customData.length} รายการล่าสุด หากต้องการดูข้อมูลทั้งหมดสามารถเข้าไปดูได้ใน Website`
            // });
            await client.replyMessage(replyToken, [
                {
                    "type": "text",
                    "text": `รายการประกาศ ${customData.length} รายการล่าสุด หากต้องการดูข้อมูลทั้งหมดสามารถเข้าไปดูได้ใน Website`
                },
                {
                    "type": "template",
                    "altText": "this is a carousel template",
                    "template": {
                        "type": "carousel",
                        "imageSize": "cover",
                        "columns": customData,
                    }
                }
            ]
            );
            return 'ok';
        } else if (event.queryResult.intent.displayName === 'losingItem') {
            const dataItem = await this.prismaService.losingItem.findMany({
                where: {
                    statusLosingItem_id: 1
                },
                take: 9,
            });
            const customData = dataItem.map((item): line.TemplateColumn => {
                let splitImageItem = item.imageItem !== null ? item.imageItem.split("/") : null
                if(item.title.includes("บัตร")) {
                    splitImageItem[6] = "w_1000,h_1500,c_scale,e_blur:1500"
                }
                return {
                    "thumbnailImageUrl": item.imageItem !== null ? splitImageItem.join('/').replace('http', 'https') : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg',
                    "text": item.title,
                    "actions": [
                        {
                            "type": "uri",
                            "label": "รายละเอียด",
                            "uri": `${process.env.CLIENT_HOST}/infolosingitem/${item.id}`
                        },
                    ],
                    "imageBackgroundColor": "#FFFFFF"
                }
            })
            // return 'ok';
            // await client.replyMessage(replyToken, {
            //     "type": "text",
            //     "text": `รายการของหาย ${customData.length} รายการล่าสุด หากต้องการดูข้อมูลทั้งหมดสามารถเข้าไปดูได้ใน Website`
            // });

            await client.replyMessage(replyToken, [
                {
                    "type": "text",
                    "text": `รายการประกาศ ${customData.length} รายการล่าสุด หากต้องการดูข้อมูลทั้งหมดสามารถเข้าไปดูได้ใน Website`
                },
                {
                    "type": "template",
                    "altText": "this is a carousel template",
                    "template": {
                        "type": "carousel",
                        "imageSize": "cover",
                        "columns": customData
                    }
                }
            ]);
            return 'ok';
        }
    }
}
