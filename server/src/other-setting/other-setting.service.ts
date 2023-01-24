import { BadRequestException, Injectable } from '@nestjs/common';
import { settingDto } from './dto';
import { readFileSync, writeFileSync } from 'fs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class OtherSettingService {
    constructor(private cloudinary: CloudinaryService) {}

    getOtherSetting() {
        const data = JSON.parse(readFileSync('./config/setting.json', 'utf8'));
        return data;
    }

    async updateOtherSetting(dto: settingDto, file: any) {
        let urlLogo = dto.logo_old
        let urlBackgroundBanner = dto.background_Banner_old
        if(file?.logo) {
            const fileName = dto.logo_old.split('/').pop().split('.')[0]
            let resDeleteImage = await this.cloudinary.deleteImageSpecifyFolder('settings',fileName)
            if (resDeleteImage.result === "ok") {
                let resUploadImage = await this.cloudinary.uploadImageSpecifyFolder('settings',file?.logo[0]).catch(() => {
                    throw new BadRequestException('Invalid file type.')
                })
                urlLogo = resUploadImage.url
            }
        }

        if(file?.background_Banner) {
            const fileName = dto.background_Banner_old.split('/').pop().split('.')[0]
            let resDeleteImage = await this.cloudinary.deleteImageSpecifyFolder('settings',fileName)
            if (resDeleteImage.result === "ok") {
                let resUploadImage = await this.cloudinary.uploadImageSpecifyFolder('settings',file?.background_Banner[0]).catch(() => {
                    throw new BadRequestException('Invalid file type.')
                })
                urlBackgroundBanner = resUploadImage.url
            }
        }

        const settings = {
            "logo": urlLogo,
            "background_Banner": urlBackgroundBanner,
            "headText_Banner": dto.headText_Banner,
            "headDesc_Banner": dto.headDesc_Banner,
        }

        writeFileSync('./config/setting.json', JSON.stringify(settings));
        return {
            isSuccess: true,
            message: "Update setting success."
        }
    }
}
