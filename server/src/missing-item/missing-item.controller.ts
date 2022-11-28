import { Body, Controller, Post, UseInterceptors, UploadedFile, Patch, Param, ParseIntPipe, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createMissingItem } from './dto';
import { MissingItemService } from './missing-item.service'

@Controller('missing-item')
export class MissingItemController {
    constructor(
        private missingItemService: MissingItemService,
    ) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    createMissingItem(
        @Body() dto: createMissingItem, 
        @UploadedFile() file: Express.Multer.File
    ) {
        // return dto
        return this.missingItemService.createMissingItemService(dto, file)
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('file'))
    updateMissingItem(
        @Body() dto: createMissingItem, 
        @UploadedFile() file: Express.Multer.File,
        @Param('id', ParseIntPipe) missingItemId: number,
    ) {
        return this.missingItemService.updateMissingItem(dto, file, missingItemId)
    }

    @Get()
    getAllMissingItem() {
        return this.missingItemService.getAllMissingItem()
    }
}
