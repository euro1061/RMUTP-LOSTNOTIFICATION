import { Module } from '@nestjs/common';
import { LosingItemController } from './losing-item.controller';
import { LosingItemService } from './losing-item.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [LosingItemController],
  providers: [LosingItemService]
})
export class LosingItemModule {}
