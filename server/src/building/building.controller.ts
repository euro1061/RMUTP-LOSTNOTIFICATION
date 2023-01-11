import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BuildingService } from './building.service';
import { createBuilding, updateBuilding } from './dto';

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

    @Post('create')
    createBuilding(
        @Body() dto: createBuilding,
    ) {
        return this.buildingService.createBuilding(dto);
        // return dto
    }

    @Delete('delete/:id')
    deleteBuilding(
        @Param('id', ParseIntPipe) buildingId: number
    ) {
        return this.buildingService.deleteBuilding(buildingId);
    }

    @Patch('update/:id')
    editBuilding(
        @Param('id', ParseIntPipe) buildingId: number,
        @Body() dto: updateBuilding
    ) {
        return this.buildingService.editBuilding(buildingId, dto)
    }
}
