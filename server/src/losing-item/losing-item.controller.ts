import { LosingItemService } from './losing-item.service';
import { Body, Controller, Post, UseInterceptors, UploadedFile, Patch, Param, ParseIntPipe, Get, Put, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createLosingItem, updateLosingItem } from './dto';

@Controller('losing-item')
export class LosingItemController {
    constructor(private readonly losingItemService: LosingItemService) { }

    @Get("getAll")
    getAllLosingItem(
        @Query('campus') campus: string = "",
        @Query('query') query: string = "",
    ) {
        return this.losingItemService.getAllLosingItem(campus, query)
    }

    @Get("getAllForAdmin")
    getAllLosingItemForAdmin(
        @Query('campus') campus: string = "",
        @Query('query') query: string = "",
    ) {
        return this.losingItemService.getAllLosingItemForAdmin(campus, query)
    }

    @Post('create')
    @UseInterceptors(FileInterceptor('file'))
    createMissingItem(
        @Body() dto: createLosingItem, 
        @UploadedFile() file: Express.Multer.File
    ) {
        // return dto
        return this.losingItemService.createLosingItem(dto, file)
    }

    @Patch('update/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateMissingItem(
        @Body() dto: updateLosingItem, 
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) losingItemId: number,
    ) {
        return this.losingItemService.updateMissingItem(dto, file, losingItemId)
    }

    @Get('user/:id')
    getMissingItemByUserId(@Param('id', ParseIntPipe) userId: number) {
        return this.losingItemService.getLosingItemByUserId(userId)
    }

    @Put('updateStatus/:id')
    updateStatusMissingItem(
        @Param('id', ParseIntPipe) losingItem: number,
    ) {
        // console.log("sadasd")
        return this.losingItemService.updateStatusLosingItem(losingItem)
    }

    @Get('/get/:id')
    getLosingItemById(@Param('id', ParseIntPipe) losingItemId: number) {
        return this.losingItemService.getLosingItemById(losingItemId)
    }

    @Get('getStatic')
    getStaticLosingItem(
        @Query('start') startDate: string = "",
        @Query('end') endDate: string = ""
    ) {
        return this.losingItemService.getStaticLosingItem(startDate, endDate)
    }

    @Get('getReport')
    getReport(
        @Query('start') startDate: string = "",
        @Query('end') endDate: string = "",
        @Query('campus') campus: string = "",
    ){
        return this.losingItemService.getReport(startDate, endDate, campus)
    }
}
