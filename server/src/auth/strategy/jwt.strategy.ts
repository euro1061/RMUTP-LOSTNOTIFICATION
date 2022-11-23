import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prismaService: PrismaService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.get('JWT_SECRET'),
            }
        )
    }

    async validate(payload: {
        sub: number,
        email: string
    }) {
        const user = await this.prismaService.user.findUnique({
            where: { 
                id: payload.sub
            },
            include: {
                Role: {
                    select: {
                        id: true,
                        role_en: true,
                        role_th: true
                    }
                },
                Prefix: {
                    select: {
                        id: true,
                        prefixTh: true,
                        prefixEn: true
                    }
                }
            }
        })
        delete user.hash
        return user
    }
}