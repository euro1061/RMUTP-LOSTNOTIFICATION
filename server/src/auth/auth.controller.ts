import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, SignupDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    
    @Post('signup')
    @ApiCreatedResponse({ description: "เพิ่มข้อมูลสมาชิก" })
    signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}
