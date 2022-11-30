import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DepartmentService {
    constructor(private prismaService: PrismaService) {}
    async getAllDepartment () {
        let response = {}
        const resData = await this.prismaService.department.findMany({
            select:{
                id: true,
                departmentTh: true,
                departmentEn: true,
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
