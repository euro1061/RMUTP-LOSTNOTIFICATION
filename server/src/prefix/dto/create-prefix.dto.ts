import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createPrefix {
    @IsString()
    @IsNotEmpty()
    prefixTh: string

    @IsString()
    @IsOptional()
    prefixEn?: string
}