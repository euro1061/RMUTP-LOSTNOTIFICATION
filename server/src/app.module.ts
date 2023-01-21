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
import { EmailServiceModule } from './email-service/email-service.module';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TodoModule, 
    AuthModule, 
    UserModule,
    PrismaModule, 
    PrefixModule, 
    RoleModule, 
    MissingItemModule, 
    CampusModule, 
    BuildingModule, 
    RoomModule, 
    DepartmentModule, 
    LosingItemModule, 
    PdfServiceModule,
    EmailServiceModule, 
    WebhookModule
  ],
  controllers: [AppController],
  providers: [AppService, PdfServiceService],
})
export class AppModule {}
