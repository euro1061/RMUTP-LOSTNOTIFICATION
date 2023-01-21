import { BadRequestException, Injectable } from '@nestjs/common';
import { response } from 'express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createMissingItem, updateStatus } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class MissingItemService {
    constructor(
        private prismaService: PrismaService,
        private cloudinary: CloudinaryService
    ) { }

    async createMissingItemService(dto: createMissingItem, file: Express.Multer.File) {
        let response = {}
        if (file) {
            let resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                throw new BadRequestException('Invalid file type.')
            })

            const dtoMissingItem = {
                title: dto.title,
                description: dto.description,
                campus_id: dto.campus_id,
                building_id: dto.building_id,
                room_id: dto.room_id,
                buildingOther: dto.buildingOther,
                roomOther: dto.roomOther,
                user_id: dto.user_id,
                statusMissing_id: dto.statusMissing_id,
                remarks: dto.remarks,
                userMissingItemDrop_id: dto.userMissingItemDrop_id ? dto.userMissingItemDrop_id : null,
            }

            const urlImage = resUploadImage.url
            const dataMissingItem = {
                ...dtoMissingItem,
                imageItem: urlImage
            }

            const resSave = await this.prismaService.missingItem.create({
                data: dataMissingItem
            })
            // console.log(dto)
            // console.log(resSave)

            const dtoUserMissingItemDrop = {
                firstName: dto.firstNameDrop,
                lastName: dto.lastNameDrop,
                phone: dto.phoneDrop,
                email: dto.emailDrop,
                lineId: dto.lineIdDrop,
                facebookUrl: dto.facebookUrlDrop,
                missingItem_id: resSave.id
            }

            if (resSave) {
                // console.log(dtoUserMissingItemDrop)
                const resSaveUserDrop = await this.prismaService.userMissingItemDrop.create({
                    data: dtoUserMissingItemDrop
                })

                if (resSaveUserDrop) {
                    response = {
                        isSuccess: true,
                        message: "บันทึกข้อมูลสำเร็จ"
                    }
                } else {
                    response = {
                        isSuccess: false,
                        message: "บันทึกข้อมูลไม่สำเร็จ"
                    }
                }
            } else {
                response = {
                    isSuccess: false,
                    message: "บันทึกข้อมูลไม่สำเร็จ"
                }
            }
        }

        return response
    }

    async updateMissingItem(dto: createMissingItem, file: Express.Multer.File, missingItemId: number, dropId: number) {
        let response = {}
        let urlImage = null

        const findItem = await this.prismaService.missingItem.findUnique({
            where: {
                id: missingItemId
            }
        })

        if (!findItem) {
            response = {
                isSuccess: false,
                message: "ไม่พบข้อมูล"
            }

            return response
        }

        if (file) {
            const fileName = findItem.imageItem.split('/').pop().split('.')[0]
            let resDeleteImage = await this.cloudinary.deleteImage(fileName)
            if (resDeleteImage.result === "ok") {
                let resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                    throw new BadRequestException('Invalid file type.')
                })
                urlImage = resUploadImage.url
            }
        }

        const dataMissingItem = {
            title: dto.title,
            campus_id: dto.campus_id,
            building_id: dto.building_id,
            room_id: dto.room_id,
            description: dto.description,
            remarks: dto.remarks,
            userMissingItemDrop_id: dto.userMissingItemDrop_id ? dto.userMissingItemDrop_id : null,
            imageItem: urlImage === null ? findItem.imageItem : urlImage,
            roomOther: dto.room_id ? null : dto.roomOther ? dto.roomOther : findItem.roomOther,
            buildingOther: dto.building_id ? null : dto.buildingOther ? dto.buildingOther : findItem.buildingOther
        }

        // console.log(missingItemId)

        const resSave = await this.prismaService.missingItem.update({
            data: {
                ...dataMissingItem
            },
            where: {
                id: missingItemId
            }
        })

        if (resSave) {
            const dataDropUser = {
                firstName: dto.firstNameDrop,
                lastName: dto.lastNameDrop,
                phone: dto.phoneDrop,
                email: dto.emailDrop,
                lineId: dto.lineIdDrop,
                facebookUrl: dto.facebookUrlDrop,
            }

            const resSaveUserDrop = await this.prismaService.userMissingItemDrop.update({
                data: {
                    ...dataDropUser
                },
                where: {
                    id: dropId
                }
            })

            if (resSaveUserDrop) {
                response = {
                    isSuccess: true,
                    message: "อัพเดทข้อมูลสำเร็จ"
                }
            } else {
                response = {
                    isSuccess: false,
                    message: "อัพเดทข้อมูลไม่สำเร็จ"
                }
            }
        } else {
            response = {
                isSuccess: false,
                message: "อัพเดทข้อมูลไม่สำเร็จ"
            }
        }

        return response
    }

    async getAllMissingItem(campus: string, query: string) {
        let condition
        if (campus === "") {
            condition = [
            // {
            //     statusMissing_id: 1,
            // },
            {
                title: {
                    contains: `${query}`
                },
            }]
        } else {
            condition = [
            // {
            //     statusMissing_id: 1,
            // },
            {
                campus_id: Number(campus),
            },
            {
                title: {
                    contains: `${query}`
                },
            }]
        }

        const res = await this.prismaService.missingItem.findMany({
            where: {
                AND: condition
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            include: {
                Campus: {
                    select: {
                        campusTh: true
                    }
                },
                Building: {
                    select: {
                        buildingTh: true
                    }
                },
                Room: {
                    select: {
                        roomTh: true
                    }
                },
                StatusMissingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                User: true
            }
        })

        return res
    }

    async getAllMissingItemForAdmin(campus: string, query: string) {
        let condition
        if (campus === "") {
            condition = [
                {
                    title: {
                        contains: `${query}`
                    },
                }]
        } else {
            condition = [
                {
                    campus_id: Number(campus),
                },
                {
                    title: {
                        contains: `${query}`
                    },
                }]
        }

        const res = await this.prismaService.missingItem.findMany({
            where: {
                AND: condition
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            include: {
                Campus: {
                    select: {
                        campusTh: true
                    }
                },
                Building: {
                    select: {
                        buildingTh: true
                    }
                },
                Room: {
                    select: {
                        roomTh: true
                    }
                },
                StatusMissingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                User: true
            }
        })

        return res
    }

    async getMissingItemByUserId(userId: number) {
        let response = {}
        const res = await this.prismaService.missingItem.findMany({
            where: {
                user_id: userId
            },
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
            include: {
                Campus: {
                    select: {
                        campusTh: true
                    }
                },
                Building: {
                    select: {
                        buildingTh: true
                    }
                },
                Room: {
                    select: {
                        roomTh: true
                    }
                },
                StatusMissingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                User: true
            }
        })
        if (res) {
            response = {
                isSuccess: true,
                message: "ดึงข้อมูลสำเร็จ",
                responseData: res,
                countTotal: res.length
            }
        } else {
            response = {
                isSuccess: false,
                message: "ไม่พบข้อมูล"
            }
        }
        return response
    }

    async updateStatusMissingItem(dto: updateStatus) {
        let response = {}
        const res = await this.prismaService.missingItem.update({
            where: {
                id: dto.missingItem_id
            },
            data: {
                statusMissing_id: 2,
                userMissingItemReceived_id: dto.userMissingItemReceive
            }
        })

        const dtoUserMissingItemDrop = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            phone: dto.phone,
            email: dto.email,
            lineId: dto.lineId,
            facebookUrl: dto.facebookUrl,
            missingItem_id: dto.missingItem_id
        }

        if (res) {
            await this.prismaService.userMissingItemReceived.create({
                data: dtoUserMissingItemDrop
            })
            response = {
                isSuccess: true,
                message: "อัพเดทสถานะสำเร็จ"
            }
        } else {
            response = {
                isSuccess: false,
                message: "อัพเดทสถานะไม่สำเร็จ"
            }
        }

        return response
    }

    async getMissingItemById(missingItemId: number) {
        let response = {}
        const res = await this.prismaService.missingItem.findUnique({
            where: {
                id: missingItemId
            },
            include: {
                Campus: {
                    select: {
                        campusTh: true
                    }
                },
                Building: {
                    select: {
                        buildingTh: true
                    }
                },
                Room: {
                    select: {
                        roomTh: true
                    }
                },
                StatusMissingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                User: true,
                userMissingItemDrop: true,
                userMissingItemReceived: true,
                UserMissingItemDrop: true,
                UserMissingItemReceived: true
            }
        })

        if (res) {
            response = {
                isSuccess: true,
                message: "ดึงข้อมูลสำเร็จ",
                responseData: res
            }
        } else {
            response = {
                isSuccess: false,
                message: "ไม่พบข้อมูล"
            }
        }

        return response
    }

    async getStaticMissingItem(startDate: string, endDate: string) {
        let response = {}
        const createEndDate = new Date(endDate)
        const endDatePlusOne = createEndDate.setDate(createEndDate.getDate() + 1)
        // const test = await this.prismaService.missingItem.findMany({
        //     where: {
        //         createdAt: {
        //             gte: new Date(startDate),
        //             lte: new Date(endDatePlusOne),
        //         }
        //     }
        // })
        // return test
        const countAll = await this.prismaService.missingItem.count({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                }
            }
        })
        const findStatus = await this.prismaService.statusMissingItem.findMany()
        const countByStatus = await this.prismaService.missingItem.groupBy({
            by: ['statusMissing_id'],
            _count: true,
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                }
            }
        })
        const mergeStatus = findStatus.map((status) => {
            const findCount = countByStatus.find((count) => count.statusMissing_id === status.id)
            return {
                id: status.id,
                statusTh: status.statusTh,
                count: findCount?._count || 0
            }
        }).sort((a, b) => a.id - b.id)
        const findCampus = await this.prismaService.campus.findMany()
        const countByCampus = await this.prismaService.missingItem.groupBy({
            by: ['campus_id'],
            _count: true,
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                }
            }
        })
        const mergeCampus = findCampus.map((campus) => {
            const findCount = countByCampus.find((count) => count.campus_id === campus.id)
            return {
                id: campus.id,
                campusTh: campus.campusTh,
                count: findCount?._count || 0
            }
        }).sort((a, b) => a.id - b.id)
        response = {
            isSuccess: true,
            responseData: {
                countAll: countAll,
                countByStatus: mergeStatus,
                staticCampus: mergeCampus,
            }
        }
        return response
    }

    async getReport(startDate: string, endDate: string, campus: string) {
        const createEndDate = new Date(endDate)
        const endDatePlusOne = createEndDate.setDate(createEndDate.getDate() + 1)

        let condition
        if(campus === ''){
            condition = {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                }
            }
        }else {
            condition = {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                },
                campus_id: parseInt(campus)
            }
        }

        const res = await this.prismaService.missingItem.findMany({
            include: {
                Campus: true,
                Building: true,
                Room: true,
            },
            where: condition
        })

        return res
    }

    async deleteMissingItem(missingItemId: number) {
        let response
        const itemData = await this.prismaService.missingItem.findUnique({
            where: {
                id: missingItemId
            }
        })
        if(itemData) {
            if(itemData.imageItem !== null && itemData.imageItem !== "") {
                const fileName = itemData.imageItem.split('/').pop().split('.')[0]
                await this.cloudinary.deleteImage(fileName)
            }
            
            const res = await this.prismaService.missingItem.delete({
                where: {
                    id: missingItemId
                }
            })
            if(res) {
                response = {
                    isSuccess: true,
                    message: "ลบข้อมูลสำเร็จ"
                }
            }else {
                response = {
                    isSuccess: false,
                    message: "ลบข้อมูลไม่สำเร็จ"
                }
            }
        }else{
            response = {
                isSuccess: false,
                message: "ไม่พบข้อมูล"
            }
        }
        return response
    }
}
