import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { readFileSync } from 'fs';
import { settingDto } from './dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { OtherSettingService } from './other-setting.service';

@Controller('other-setting')
export class OtherSettingController {
    constructor(private otherService: OtherSettingService) {}

    @Get()
    getOtherSetting() {
        const data = JSON.parse(readFileSync('./config/setting.json', 'utf8'));
        return data;
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([{ name: 'logo', maxCount: 1 },
    { name: 'background_Banner', maxCount: 1 }]))
    // @UseInterceptors(FileInterceptor('logo'))
    updateOtherSetting(
        @Body() dto: settingDto,
        @UploadedFiles() file: Express.Multer.File,
        // @UploadedFile('logo') file2: Express.Multer.File,
    ) {
        return this.otherService.updateOtherSetting(dto, file)
    }
}
