import { Module } from '@nestjs/common';
import { MissingItemService } from './missing-item.service';
import { MissingItemController } from './missing-item.controller';
import { HttpModule } from '@nestjs/axios'
import { CloudinaryModule } from '../cloudinary/cloudinary.module'

@Module({
  imports: [HttpModule, CloudinaryModule],
  providers: [MissingItemService],
  controllers: [MissingItemController]
})
export class MissingItemModule {}
