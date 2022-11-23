import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CampusService {
    constructor(private prismaService: PrismaService) {}

    async getAllCampus() {
        let response = {}
        const resData = await this.prismaService.campus.findMany()
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
