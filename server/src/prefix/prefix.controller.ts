import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createPrefix } from './dto';
import { PrefixService } from './prefix.service';

@Controller('prefix')
export class PrefixController {
    constructor(private prefixService: PrefixService) {}

    @Get()
    getAllPrefix() {
        return this.prefixService.getAllPrefix();
    }

    @Get(':id')
    getPrefixById(
        @Param('id', ParseIntPipe) prefixId: number
    ) {
        return this.prefixService.getPrefixById(prefixId);
    }

    @Post()
    createPrefix(@Body() dto: createPrefix) {
        return this.prefixService.createPrefix(dto)
    }

    @Patch(':id')
    editPrefix(
        @Param('id', ParseIntPipe) prefixId: number,
        @Body() dto: createPrefix
    ) {
        return this.prefixService.editPrefix(prefixId, dto)
    }

    @Delete(':id')
    deletePrefix(
        @Param('id', ParseIntPipe) prefixId: number
    ) {
        return this.prefixService.deletePrefix(prefixId);
    }
}
