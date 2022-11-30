import { Controller, Get } from '@nestjs/common';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
    constructor(private departmentService: DepartmentService){}
    @Get()
    getAllDepartment() {
        return this.departmentService.getAllDepartment();
    }
}
