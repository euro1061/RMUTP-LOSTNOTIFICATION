import { Body, Controller, Get, Patch, UseGuards, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { GetUser } from '../decorator';
import { searchStudent, UserProfileEdit } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    getMe(@GetUser() user: User) {
        return user
    }

    @Patch('editProfile')
    @UseInterceptors(FileInterceptor('file'))
    userEditProfile(
        @Body() dto: UserProfileEdit, 
        @GetUser('id') userId: Number,
        @UploadedFile() file: Express.Multer.File,

    ) {
        return this.userService.userEditProfile(dto, userId, file)
    }

    @Post('searchStudents')
    searchStudents(@Body() dto: searchStudent) {
        return this.userService.searchStudents(dto)
    }
}
