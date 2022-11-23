import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoleService {
    constructor(private prismaService: PrismaService) { }
    async getAllRole() {
        let response = {}
        const allRole = await this.prismaService.role.findMany()
        if(allRole) {
            response = {
                isSuccess: true,
                responseData: allRole
            }
        }else {
            response = {
                isSuccess: false,
                responseData: null
            }
        }
        return response
    }

    async getRoleById(roleId: number) {
        let response = {}
        const roleGetOne = await this.prismaService.role.findUnique({
            where: {
                id: roleId
            }
        })
        if(roleGetOne) {
            response = {
                isSuccess: true,
                responseData: roleGetOne
            }
        }else {
            response = {
                isSuccess: false,
                responseData: null
            }
        }
        return response
    }
}
