import { BadRequestException, Injectable } from '@nestjs/common';
import { createLosingItem, updateLosingItem } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class LosingItemService {
    constructor(
        private prismaService: PrismaService,
        private cloudinary: CloudinaryService
    ) { }

    async getAllLosingItem(campus: string, query: string) {
        let condition
        if (campus === "") {
            condition = [{
                statusLosingItem_id: 1,
            },
            {
                title: {
                    contains: `${query}`
                },
            }]
        } else {
            condition = [{
                statusLosingItem_id: 1,
            },
            {
                campus_id: Number(campus),
            },
            {
                title: {
                    contains: `${query}`
                },
            }]
        }

        const res = await this.prismaService.losingItem.findMany({
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
                StatusLosingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                LosingItem: true,
                UserLosingItemDrop: true,
                LosingItemDrop: true
            }
        })

        return res
    }

    async getAllLosingItemForAdmin(campus: string, query: string) {
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

        const res = await this.prismaService.losingItem.findMany({
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
                StatusLosingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                LosingItem: true,
                UserLosingItemDrop: true,
                LosingItemDrop: true
            }
        })

        return res
    }

    async createLosingItem(dto: createLosingItem, file: Express.Multer.File) {
        let response = {}
        let urlImage = null
        if (file) {
            let resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                throw new BadRequestException('Invalid file type.')
            })

            urlImage = resUploadImage.url
        }

        const dtoLosingItem = {
            title: dto.title,
            description: dto.description,
            campus_id: dto.campus_id,
            user_id: dto.user_id,
            statusLosingItem_id: dto.statusLosingItem_id,
            userDrop_id: dto.userDrop_id ? dto.userDrop_id : null,
            imageItem: urlImage
        }

        const resSave = await this.prismaService.losingItem.create({
            data: dtoLosingItem
        })
        // console.log(dto)
        // console.log(resSave)

        const dtoUserLosingItemDrop = {
            firstName: dto.firstNameDrop ? dto.firstNameDrop : null,
            lastName: dto.lastNameDrop ? dto.lastNameDrop : null,
            phone: dto.phoneDrop ? dto.phoneDrop : null,
            email: dto.emailDrop ? dto.emailDrop : null,
            lineId: dto.lineIdDrop ? dto.lineIdDrop : null,
            facebookUrl: dto.facebookUrlDrop ? dto.facebookUrlDrop : null,
            losingItem_id: resSave.id
        }

        // console.log(dtoUserLosingItemDrop)

        if (resSave) {
            const resSaveUserDrop = await this.prismaService.userLosingItemDrop.create({
                data: dtoUserLosingItemDrop
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

        return response
    }

    async getLosingItemByUserId(userId: number) {
        let response = {}
        const res = await this.prismaService.losingItem.findMany({
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
                StatusLosingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                LosingItem: true
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

    async updateStatusLosingItem(losingItem: number) {
        let response = {}
        const res = await this.prismaService.losingItem.update({
            where: {
                id: losingItem
            },
            data: {
                statusLosingItem_id: 2
            }
        })
        if (res) {
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

    async getLosingItemById(losingItemId: number) {
        let response = {}
        const res = await this.prismaService.losingItem.findFirst({
            where: {
                id: losingItemId
            },
            include: {
                Campus: {
                    select: {
                        campusTh: true
                    }
                },
                StatusLosingItem: {
                    select: {
                        id: true,
                        statusTh: true
                    }
                },
                LosingItem: true,
                UserLosingItemDrop: true,
                LosingItemDrop: true
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

    async updateMissingItem(dto: updateLosingItem, file: Express.Multer.File, losingItemId: number) {
        let response = {}
        let urlImage = null

        const findItem = await this.prismaService.losingItem.findUnique({
            where: {
                id: losingItemId
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
            if (findItem.imageItem !== null) {
                const fileName = findItem.imageItem.split('/').pop().split('.')[0]
                let resDeleteImage = await this.cloudinary.deleteImage(fileName)
                if (resDeleteImage.result === "ok") {
                    let resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                        throw new BadRequestException('Invalid file type.')
                    })
                    urlImage = resUploadImage.url
                }
            } else {
                let resUploadImage = await this.cloudinary.uploadImage(file).catch(() => {
                    throw new BadRequestException('Invalid file type.')
                })
                urlImage = resUploadImage.url
            }
        } else {
            if (findItem.imageItem !== null) {
                const fileName = findItem.imageItem.split('/').pop().split('.')[0]
                let resDeleteImage = await this.cloudinary.deleteImage(fileName)
                if (resDeleteImage.result === "ok") {
                    urlImage = null
                }
            } else {
                urlImage = findItem.imageItem
            }
        }

        const dtoLosingItem = {
            title: dto.title,
            description: dto.description,
            campus_id: dto.campus_id,
            user_id: dto.user_id,
            userDrop_id: dto.userDrop_id ? dto.userDrop_id : null,
            imageItem: urlImage
        }

        const resSave = await this.prismaService.losingItem.update({
            where: {
                id: losingItemId
            },
            data: dtoLosingItem
        })

        const dtoUserLosingItemDrop = {
            firstName: dto.firstNameDrop ? dto.firstNameDrop : null,
            lastName: dto.lastNameDrop ? dto.lastNameDrop : null,
            phone: dto.phoneDrop ? dto.phoneDrop : null,
            email: dto.emailDrop ? dto.emailDrop : null,
            lineId: dto.lineIdDrop ? dto.lineIdDrop : null,
            facebookUrl: dto.facebookUrlDrop ? dto.facebookUrlDrop : null,
            losingItem_id: resSave.id
        }

        if (resSave) {
            const resSaveUserDrop = await this.prismaService.userLosingItemDrop.update({
                where: {
                    id: dto.userLosingDropId
                },
                data: dtoUserLosingItemDrop
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

        return response
    }

    async getStaticLosingItem(startDate: string, endDate: string) {
        let response = {}
        const createEndDate = new Date(endDate)
        const endDatePlusOne = createEndDate.setDate(createEndDate.getDate() + 1)
        const countAll = await this.prismaService.losingItem.count({
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                }
            }
        })
        const findStatus = await this.prismaService.statusLosingItem.findMany()
        const countByStatus = await this.prismaService.losingItem.groupBy({
            by: ['statusLosingItem_id'],
            _count: true,
            where: {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDatePlusOne),
                }
            }
        })
        const mergeStatus = findStatus.map((status) => {
            const findCount = countByStatus.find((count) => count.statusLosingItem_id === status.id)
            return {
                id: status.id,
                statusTh: status.statusTh,
                count: findCount?._count || 0
            }
        }).sort((a, b) => a.id - b.id)
        const findCampus = await this.prismaService.campus.findMany()
        const countByCampus = await this.prismaService.losingItem.groupBy({
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
        const findCampus = await this.prismaService.campus.findMany()
        const countByCampus = await this.prismaService.losingItem.groupBy({
            by: ['campus_id'],
            _count: true,
            where: condition
        })
        const mergeCampus = findCampus.map((campus) => {
            const findCount = countByCampus.find((count) => count.campus_id === campus.id)
            return {
                id: campus.id,
                campusTh: campus.campusTh,
                count: findCount?._count || 0
            }
        }).sort((a, b) => a.id - b.id)
        return mergeCampus
    }
}
