import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createPrefix } from './dto';

@Injectable()
export class PrefixService {
    constructor(private prismaService: PrismaService) { }
    async getAllPrefix() {
        let response = {}
        const allPrefix = await this.prismaService.prefix.findMany()
        if(allPrefix) {
            response = {
                isSuccess: true,
                responseData: allPrefix
            }
        }else {
            response = {
                isSuccess: false,
                responseData: null
            }
        }
        return response
    }

    async getPrefixById(prefixId: number) {
        let response = {}
        const prefixGetOne = await this.prismaService.prefix.findUnique({
            where: {
                id: prefixId
            }
        })
        if(prefixGetOne) {
            response = {
                isSuccess: true,
                responseData: prefixGetOne
            }
        }else {
            response = {
                isSuccess: false,
                responseData: null
            }
        }
        return response
    }

    async createPrefix(dto: createPrefix) {
        let res = {}
        const prefixSearch = await this.prismaService.prefix.findFirst({
            where: {
                prefixTh: dto.prefixTh
            }
        })

        if (prefixSearch) throw new ForbiddenException("มีข้อมูลนี้อยู่แล้ว")

        const prefix = await this.prismaService.prefix.create({
            data: {
                ...dto
            }
        })

        if (prefix) {
            res = {
                isSuccess: true,
                idLastInsert: prefix.id,
                message: "เพิ่มข้อมูลสำเร็จ"
            }
        }else {
            res = {
                isSuccess: false,
                idLastInsert: null,
                message: "เพิ่มข้อมูลไม่สำเร็จ"
            }
        }

        return res
    }

    async deletePrefix(prefixId: number) {
        let res = {}
        const prefixSearch = await this.prismaService.prefix.findUnique({
            where: {
                id: prefixId
            }
        })

        if (!prefixSearch)
            throw new ForbiddenException('ไม่พบข้อมูลที่จะลบ')

        const prefix = await this.prismaService.prefix.delete({
            where: {
                id: prefixId
            }
        })

        if (prefix) {
            res = {
                isSuccess: true,
                idLastDelete: prefix.id,
                message: "ลบข้อมูลสำเร็จ"
            }
        }else {
            res = {
                isSuccess: false,
                idLastDelete: null,
                message: "ลบข้อมูลไม่สำเร็จ"
            }
        }

        return res
    }

    async editPrefix(prefixId: number, dto: createPrefix) {
        let res = {}
        const prefixSearch = await this.prismaService.prefix.findUnique({
            where: {
                id: prefixId
            }
        })
        
        if(!prefixSearch) throw new ForbiddenException("ไม่พบข้อมูลที่จะแก้ไข");
        
        const prefixUpdate = await this.prismaService.prefix.update({
            where: {
                id: prefixId
            },
            data: {
                ...dto
            }
        })

        if (prefixUpdate){
            res = {
                isSuccess: true,
                idLastUpdate: prefixId,
                message: "แก้ไขข้อมูลสำเร็จ"
            }
        }else {
            res = {
                isSuccess: false,
                idLastUpdate: null,
                message: "แก้ไขข้อมูลไม่สำเร็จ"
            }
        }

        return res
    }
}
