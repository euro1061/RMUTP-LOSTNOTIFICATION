import { Injectable } from '@nestjs/common';
import { SendGridService } from "@anchan828/nest-sendgrid";
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailServiceService {
    constructor(private readonly sendGrid: SendGridService) { }

    async sendEmail() {
        // try {
        //     // console.log(1);
        //     // const res = await this.sendGrid.send({
        //     //     to: "sahatsawat-b@rmutp.ac.th",
        //     //     from: process.env.FROM_EMAIL,
        //     //     subject: "Sending with SendGrid is Fun",
        //     //     text: "and easy to do anywhere, even with Node.js",
        //     //     html: "<strong>and easy to do anywhere, even with Node.js</strong>",
        //     // });
        //     // return res;

        // } catch (error) {
        //     console.log(2);
        //     return error
        // }
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_EMAIL,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.PASSWORD_EMAIL
            }
        });

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.FROM_EMAIL, // sender address
            to: 'poiuytrewqq1064@gmail.com',
            subject: 'Hello ✔', // Subject line
            html: '<b>Hello world?</b>' // html body
        });

        console.log(info)

        console.log('Message sent: %s', info.messageId);
    }
}
