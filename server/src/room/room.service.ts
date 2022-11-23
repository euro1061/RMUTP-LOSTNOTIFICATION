import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
    constructor(private prismaService: PrismaService) {}

    async getAllRoom() {
        let response = {}
        const resData = await this.prismaService.room.findMany()
        if(resData) {
            response = {
                isSuccess: true,
                responseData: resData
            }
        }else{ 
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
        if(resData) {
            response = {
                isSuccess: true,
                responseData: resData
            }
        }else{ 
            response = {
                isSuccess: false,
                responseData: null
            }
        }
        return response
    }
}
