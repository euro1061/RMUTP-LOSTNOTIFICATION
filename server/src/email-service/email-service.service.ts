import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { sendMailDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PATH_METADATA } from '@nestjs/common/constants';
@Injectable()
export class EmailServiceService {
    constructor(
        private prismaService: PrismaService,
    ) { }

    async sendEmail(dto: sendMailDto) {
        // return headers
        let data
        let messageHTML = ``
        let subject = ``
        let email_receiver = ``
        if(dto.typeEmail === 1) {
            data = await this.prismaService.missingItem.findUnique({
                where: {
                    id: dto.itemId
                },
                include: {
                    User: true
                }
            })
            email_receiver = data.User.email
            // return data.title
            subject = `มีผู้ส่งข้อความจากประกาศ : ${data.title}`
            messageHTML = `<b>ผู้ส่ง</b> : ${dto.name} <br>
            <b>ข้อความ</b> : ${dto.message} <br>
            <br>
            <b>ข้อมูลการติดต่อกลับ</b> <br>
            <b>เบอร์โทร</b> : ${dto.phone !== "" && dto.phone !== null ? dto.phone : "ไม่มี"} <br>
            <b>อีเมล์</b> : ${dto.email_sender !== "" && dto.email_sender !== null ? dto.email_sender : "ไม่มี"} <br>
            <hr />
            <a 
                href="${process.env.HOST_CLIENT}/infomissingitem/${data.id}"
                target="_blank"
                style="background-color: #5b21b6;border-radius: 3px; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
                ดูประกาศนี้
            </a>
            `
        }else if(dto.typeEmail === 2) {
            data = await this.prismaService.losingItem.findUnique({
                where: {
                    id: dto.itemId
                },
                include: {
                    LosingItem: true
                }
            })
            email_receiver = data.LosingItem.email
            subject = `มีผู้ส่งข้อความจากประกาศ : ${data.title}`
            messageHTML = `<b>ผู้ส่ง</b> : ${dto.name} <br>
            <b>ข้อความ</b> : ${dto.message} <br>
            <br>
            <b>ข้อมูลการติดต่อกลับ</b> <br>
            <b>เบอร์โทร</b> : ${dto.phone !== "" && dto.phone !== null ? dto.phone : "ไม่มี"} <br>
            <b>อีเมล์</b> : ${dto.email_sender !== "" && dto.email_sender !== null ? dto.email_sender : "ไม่มี"} <br>
            <hr />
            <a 
                href="${process.env.HOST_CLIENT}/infolosingitem/${data.id}"
                target="_blank"
                style="background-color: #5b21b6;border-radius: 3px; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">
                ดูประกาศนี้
            </a>
            `
        }

        let response = {}
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_EMAIL,
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.FROM_EMAIL,
                pass: process.env.PASSWORD_EMAIL
            }
        })
        // send mail with defined transport object
        try {
            const info = await transporter.sendMail({
                from: dto.email_sender, // sender address
                to: email_receiver,
                subject: subject, // Subject line
                html: messageHTML // html body
            })
    
            if(info) {
                response = {
                    isSuccess: true,
                    message: 'Email sent successfully',
                    info: info
                }
                return response
            }
        } catch (error) {
            response = {
                isSuccess: false,
                message: 'Email sent failed',
                error: error
            }
            return response
        }
    }
}
