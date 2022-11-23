import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Get()
    getAllRole() {
        return this.roleService.getAllRole();
    }

    @Get(':id')
    getRoleById(
        @Param('id', ParseIntPipe) roleId: number
    ) {
        return this.roleService.getRoleById(roleId);
    }
}
