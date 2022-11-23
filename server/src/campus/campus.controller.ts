import { Controller, Get } from '@nestjs/common';
import { CampusService } from './campus.service';

@Controller('campus')
export class CampusController {
    constructor(private campusService: CampusService) {}

    @Get()
    getAllCampus() {
        return this.campusService.getAllCampus()
    }
}
