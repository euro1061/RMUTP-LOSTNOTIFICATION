import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createBuilding, updateBuilding } from './dto';
import { updateCampus } from 'src/campus/dto';

@Injectable()
export class BuildingService {
    constructor(private prismaService: PrismaService) { }

    async getAllBuilding() {
        let response = {}
        const resData = await this.prismaService.building.findMany()
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

    async getBuildingByCampus(campusId: number) {
        let response = {}
        const resData = await this.prismaService.building.findMany({
            where: {
                campus_id: campusId
            }
        })
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

    async createBuilding(dto: createBuilding) {
        let response = {}
        const resData = await this.prismaService.building.create({
            data: {
                buildingTh: dto.buildingTh,
                campus_id: dto.campus_id
            }
        })
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

    async deleteBuilding(buildingId: number) {
        // console.log(campusId)
        let res = {}
        const buildingSearch = await this.prismaService.building.findUnique({
            where: {
                id: buildingId
            }
        })

        if (!buildingSearch)
            throw new ForbiddenException('ไม่พบข้อมูลที่จะลบ')

        try {
            const building = await this.prismaService.building.delete({
                where: {
                    id: buildingId
                }
            })

            if (building) {
                res = {
                    isSuccess: true,
                    idLastDelete: building.id,
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
            if (error.code === "P2003") {
                res = {
                    isSuccess: false,
                    idLastDelete: null,
                    message: "ลบข้อมูลไม่สำเร็จ เนื่องจากมีข้อมูลอยู่ในตารางอื่น"
                }
            }
        }

        return res
    }

    async editBuilding(buildingId: number, dto: updateBuilding) {
        let res = {}
        const buildingSearch = await this.prismaService.building.findUnique({
            where: {
                id: buildingId
            }
        })

        if (!buildingSearch) throw new ForbiddenException("ไม่พบข้อมูลที่จะแก้ไข");

        const buildingUpdate = await this.prismaService.building.update({
            where: {
                id: buildingId
            },
            data: {
                ...dto
            }
        })

        if (buildingUpdate) {
            res = {
                isSuccess: true,
                idLastUpdate: buildingId,
                message: "แก้ไขข้อมูลสำเร็จ"
            }
        } else {
            res = {
                isSuccess: false,
                idLastUpdate: null,
                message: "แก้ไขข้อมูลไม่สำเร็จ"
            }
        }

        return res
    }
}
