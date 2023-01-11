import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoom, updateRoom } from './dto';

@Injectable()
export class RoomService {
    constructor(private prismaService: PrismaService) { }

    async getAllRoom() {
        let response = {}
        const resData = await this.prismaService.room.findMany()
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

    async getRoomByBuilding(buildingId) {
        let response = {}
        const resData = await this.prismaService.room.findMany({
            where: {
                building_id: buildingId
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

    async createRoom(dto: createRoom) {
        let response = {}
        const resData = await this.prismaService.room.create({
            data: {
                roomTh: dto.roomTh,
                building_id: dto.building_id
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

    async deleteRoom(roomId: number) {
        let res = {}
        const roomSearch = await this.prismaService.room.findUnique({
            where: {
                id: roomId
            }
        })

        if (!roomSearch)
            throw new ForbiddenException('ไม่พบข้อมูลที่จะลบ')

        try {
            const room = await this.prismaService.room.delete({
                where: {
                    id: roomId
                }
            })

            if (room) {
                res = {
                    isSuccess: true,
                    idLastDelete: room.id,
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

    async editRoom(roomId: number, dto: updateRoom) {
        let res = {}
        const roomSearch = await this.prismaService.room.findUnique({
            where: {
                id: roomId
            }
        })

        if (!roomSearch) throw new ForbiddenException("ไม่พบข้อมูลที่จะแก้ไข");

        const roomUpdate = await this.prismaService.room.update({
            where: {
                id: roomId
            },
            data: {
                ...dto
            }
        })

        if (roomUpdate) {
            res = {
                isSuccess: true,
                idLastUpdate: roomId,
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
