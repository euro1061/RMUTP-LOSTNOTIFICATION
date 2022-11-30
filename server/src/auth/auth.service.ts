import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, SignupDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private config: ConfigService,
        private cloudinary: CloudinaryService
    ) { }
    async signup(dto: SignupDto, file: Express.Multer.File) {
        let response = {}
        const hash = await argon.hash(dto.password)
        let urlImage = null
        if (file) {
            let resUploadImage
            resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                throw new BadRequestException('Invalid file type.')
            })
            urlImage = resUploadImage.url
        }

        try {
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email || null,
                    stuId: dto.stuId,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                    phone: dto.phone || null,
                    lineId: dto.lineId || null,
                    facebookUrl: dto.facebookUrl || null,
                    role_id: dto.role_id,
                    prefix_id: dto.prefix_id,
                    department_id: dto.department_id,
                    urlPicture: urlImage
                }
            })
            if (user) {
                response = {
                    isSuccess: true,
                    message: "สร้างข้อมูลสำเร็จ",
                }
            } else {
                response = {
                    isSuccess: false,
                    message: "สร้างข้อมูลไม่สำเร็จ",
                }
            }
            return response
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new ForbiddenException("Credentials takens")
                }
            }
            throw error
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                stuId: dto.stuId
            }
        })

        if (!user) throw new ForbiddenException('ไม่พบข้อมูลผู้ใช้ในระบบ')

        const pwMatch = await argon.verify(user.hash, dto.password)

        if (!pwMatch) throw new ForbiddenException('รหัสผ่านไม่ถูกต้อง')
        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const token = await this.jwtService.signAsync(payload, {
            // expiresIn: '2h',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token: token
        }
    }
}

