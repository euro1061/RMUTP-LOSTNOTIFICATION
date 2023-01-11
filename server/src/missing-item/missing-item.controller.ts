import { Body, Controller, Post, UseInterceptors, UploadedFile, Patch, Param, ParseIntPipe, Get, Put, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMissingItem, updateStatus } from './dto';
import { MissingItemService } from './missing-item.service';
import moment from 'moment';

@Controller('missing-item')
export class MissingItemController {
    constructor(
        private missingItemService: MissingItemService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createMissingItem(
        @Body() dto: createMissingItem,
        @UploadedFile() file: Express.Multer.File
    ) {
        // return dto
        return this.missingItemService.createMissingItemService(dto, file)
    }

    @Patch(':id/:dropId')
    @UseInterceptors(FileInterceptor('file'))
    updateMissingItem(
        @Body() dto: createMissingItem,
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) missingItemId: number,
        @Param('dropId', ParseIntPipe) dropIp: number,
    ) {
        return this.missingItemService.updateMissingItem(dto, file, missingItemId, dropIp)
    }

    @Put('updateStatus')
    updateStatusMissingItem(
        @Body() dto: updateStatus,
    ) {
        // console.log("sadasd")
        return this.missingItemService.updateStatusMissingItem(dto)
    }

    @Get("getAll")
    getAllMissingItem(
        @Query('campus') campus: string = "",
        @Query('query') query: string = "",
    ) {
        return this.missingItemService.getAllMissingItem(campus, query)
    }

    @Get("GetAllforAdmin")
    getAllMissingItemForAdmin(
        @Query('campus') campus: string = "",
        @Query('query') query: string = "",
    ) {
        return this.missingItemService.getAllMissingItemForAdmin(campus, query)
    }

    @Get('user/:id')
    getMissingItemByUserId(@Param('id', ParseIntPipe) userId: number) {
        return this.missingItemService.getMissingItemByUserId(userId)
    }

    // get missing item by id
    @Get('/get/:id')
    getMissingItemById(@Param('id', ParseIntPipe) missingItemId: number) {
        return this.missingItemService.getMissingItemById(missingItemId)
    }

    @Get('getStatic')
    getStaticMissingItem(
        @Query('start') startDate: string = "",
        @Query('end') endDate: string = ""
    ) {
        return this.missingItemService.getStaticMissingItem(startDate, endDate)
    }

    @Get('getReport')
    getReport(
        @Query('start') startDate: string = "",
        @Query('end') endDate: string = "",
        @Query('campus') campus: string = "",
    ){
        return this.missingItemService.getReport(startDate, endDate, campus)
    }
}
