import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrefixModule } from './prefix/prefix.module';
import { RoleModule } from './role/role.module';
import { MissingItemModule } from './missing-item/missing-item.module';
import { CampusModule } from './campus/campus.module';
import { BuildingModule } from './building/building.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TodoModule, 
    AuthModule, 
    UserModule,
    PrismaModule, PrefixModule, RoleModule, MissingItemModule, CampusModule, BuildingModule, RoomModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
