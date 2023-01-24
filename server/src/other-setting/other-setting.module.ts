import { Module } from '@nestjs/common';
import { OtherSettingController } from './other-setting.controller';
import { OtherSettingService } from './other-setting.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [OtherSettingController],
  providers: [OtherSettingService]
})
export class OtherSettingModule {}
