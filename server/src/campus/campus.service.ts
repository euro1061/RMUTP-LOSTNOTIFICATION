import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createCampus, updateCampus } from './dto';

@Injectable()
export class CampusService {
    constructor(private prismaService: PrismaService) { }

    async getAllCampus() {
        let response = {}
        const resData = await this.prismaService.campus.findMany()
        if (resData) {
            response = {
                isSuccess: true,
                responseData: resData
            }
        } else {
            response = {
                isSuccess: false,
                responseData: null
            }
        }
        return response
    }

    async createCampus(dto: createCampus) {
        let response = {}
        const resData = await this.prismaService.campus.create({
            data: {
                ...dto
            }
        })
        if (resData) {
            response = {
                isSuccess: true,
                message: "บันทึกข้อมูลสำเร็จ",
            }
        } else {
            response = {
                isSuccess: false,
                message: "บันทึกข้อมูลไม่สำเร็จ"
            }
        }
        return response
    }

    async deleteCampus(campusId: number) {
        // console.log(campusId)
        let res = {}
        const campusSearch = await this.prismaService.campus.findUnique({
            where: {
                id: campusId
            }
        })

        if (!campusSearch)
            throw new ForbiddenException('ไม่พบข้อมูลที่จะลบ')

        try {
            const campus = await this.prismaService.campus.delete({
                where: {
                    id: campusId
                }
            })

            if (campus) {
                res = {
                    isSuccess: true,
                    idLastDelete: campus.id,
                    message: "ลบข้อมูลสำเร็จ"
                }
            } else {
                res = {
                    isSuccess: false,
                    idLastDelete: null,
                    message: "ลบข้อมูลไม่สำเร็จ"
                }
            }
        } catch (error) {
            if(error.code === "P2003") {
                res = {
                    isSuccess: false,
                    idLastDelete: null,
                    message: "ลบข้อมูลไม่สำเร็จ เนื่องจากมีข้อมูลอยู่ในตารางอื่น"
                }
            }
        }

        return res
    }

    async editCampus(campusId: number, dto: updateCampus) {
        let res = {}
        const campusSearch = await this.prismaService.campus.findUnique({
            where: {
                id: campusId
            }
        })
        
        if(!campusSearch) throw new ForbiddenException("ไม่พบข้อมูลที่จะแก้ไข");
        
        const campusUpdate = await this.prismaService.campus.update({
            where: {
                id: campusId
            },
            data: {
                ...dto
            }
        })

        if (campusUpdate){
            res = {
                isSuccess: true,
                idLastUpdate: campusId,
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
