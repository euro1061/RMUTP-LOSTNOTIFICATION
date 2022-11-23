import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BuildingService {
    constructor(private prismaService: PrismaService) {}

    async getAllBuilding() {
        let response = {}
        const resData = await this.prismaService.building.findMany()
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

    async getBuildingByCampus(campusId: number) {
        let response = {}
        const resData = await this.prismaService.building.findMany({
            where: {
                campus_id: campusId
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
