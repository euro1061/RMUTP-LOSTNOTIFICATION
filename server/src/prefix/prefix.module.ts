import { Module } from '@nestjs/common';
import { PrefixController } from './prefix.controller';
import { PrefixService } from './prefix.service';

@Module({
  controllers: [PrefixController],
  providers: [PrefixService]
})
export class PrefixModule {}
