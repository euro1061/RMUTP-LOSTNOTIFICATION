import { IsNotEmpty, IsString } from "class-validator"

export class createCampus {
    @IsString()
    @IsNotEmpty()
    campusTh: string
}