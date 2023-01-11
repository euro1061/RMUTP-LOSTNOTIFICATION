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
import { DepartmentModule } from './department/department.module';
import { LosingItemModule } from './losing-item/losing-item.module';
import { PdfServiceService } from './pdf-service/pdf-service.service';
import { PdfServiceModule } from './pdf-service/pdf-service.module';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmailServiceModule } from './email-service/email-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    TodoModule, 
    AuthModule, 
    UserModule,
    PrismaModule, PrefixModule, RoleModule, MissingItemModule, CampusModule, BuildingModule, RoomModule, DepartmentModule, LosingItemModule, PdfServiceModule, EmailServiceModule
  ],
  controllers: [AppController],
  providers: [AppService, PdfServiceService],
})
export class AppModule {}
