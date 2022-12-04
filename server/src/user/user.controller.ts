import { Body, Controller, Get, Patch, UseGuards, Post, UseInterceptors, UploadedFile, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { GetUser } from '../decorator';
import { searchStudent, UserProfileEdit, UserProfileEditAdmin } from './dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

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

    @Patch('editProfileAdmin')
    @UseInterceptors(FileInterceptor('file'))
    userEditProfileAdmin(
        @Body() dto: UserProfileEditAdmin,
        @UploadedFile() file: Express.Multer.File,

    ) {
        return this.userService.userEditProfileAdmin(dto, file)
    }

    @Post('searchStudents')
    searchStudents(@Body() dto: searchStudent, @GetUser() user: User) {
        return this.userService.searchStudents(dto, user)
    }

    @Get(':search')
    getAllUsers(
        @Param('search') search: string,
        @GetUser() user: User
    ) {
        return this.userService.getAllUsers(search, user)
    }

    @Delete(':id')
    deleteUserAdmin(
        @Param('id', ParseIntPipe) userId: number
    ) {
        return this.userService.deleteUserAdmin(userId);
    }
}
