import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { createMissingItem } from './dto';

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
            const urlImage = resUploadImage.url
            const dataMissingItem = {
                ...dto,
                imageItem: urlImage
            }

            const resSave = await this.prismaService.missingItem.create({
                data: dataMissingItem
            })

            if (resSave) {
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
        }

        return response
    }

    async updateMissingItem(dto: createMissingItem, file: Express.Multer.File, missingItemId: number) {
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
            }else{
                response = {
                    isSuccess: false,
                    message: "ลบรูปภาพไม่สำเร็จ"
                }
            }
        }

        const dataMissingItem = {
            ...dto,
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

        if(resSave) {
            response = {
                isSuccess: true,
                message: "อัพเดทข้อมูลสำเร็จ"
            }
        }else{
            response = {
                isSuccess: false,
                message: "อัพเดทข้อมูลไม่สำเร็จ"
            }
        }

        return response
    }
}
