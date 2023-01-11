import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { CampusService } from './campus.service';
import { createCampus, updateCampus } from './dto';

@Controller('campus')
export class CampusController {
    constructor(private campusService: CampusService) {}

    @Get()
    getAllCampus() {
        return this.campusService.getAllCampus()
    }

    @Post('create')
    createCampus(
        @Body() dto: createCampus, 
    ) {
        return this.campusService.createCampus(dto)
    }

    @Delete('delete/:id')
    deleteCampus(
        @Param('id', ParseIntPipe) campusId: number
    ) {
        return this.campusService.deleteCampus(campusId);
    }

    @Patch('update/:id')
    editCampus(
        @Param('id', ParseIntPipe) campusId: number,
        @Body() dto: updateCampus
    ) {
        return this.campusService.editCampus(campusId, dto)
    }
}
