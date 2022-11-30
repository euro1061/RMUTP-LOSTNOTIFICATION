import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('signup')
    @UseInterceptors(FileInterceptor('file'))
    @ApiCreatedResponse({ description: "เพิ่มข้อมูลสมาชิก" })
    signup(
        @Body() dto: SignupDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.authService.signup(dto, file)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}
