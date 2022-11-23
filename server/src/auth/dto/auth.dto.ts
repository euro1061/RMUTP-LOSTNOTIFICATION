import { IsNotEmpty, IsString } from "class-validator"
export class AuthDto {
    @IsString()
    @IsNotEmpty()
    stuId: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}