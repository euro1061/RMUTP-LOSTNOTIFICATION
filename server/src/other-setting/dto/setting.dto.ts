import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class settingDto {
    @IsString()
    @IsNotEmpty()
    headText_Banner: string

    @IsString()
    @IsNotEmpty()
    headDesc_Banner?: string

    @IsString()
    @IsNotEmpty()
    background_Banner_old?: string

    @IsString()
    @IsNotEmpty()
    logo_old?: string
}