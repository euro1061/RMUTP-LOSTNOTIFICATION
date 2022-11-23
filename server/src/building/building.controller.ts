import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BuildingService } from './building.service';

@Controller('building')
export class BuildingController {
    constructor(private buildingService: BuildingService) {}

    @Get()
    getAllBuilding() {
        return this.buildingService.getAllBuilding()
    }

    @Get(':id')
    getBuildingByCampus(@Param('id', ParseIntPipe) campusId: number) {
        return this.buildingService.getBuildingByCampus(campusId);
    }
}
