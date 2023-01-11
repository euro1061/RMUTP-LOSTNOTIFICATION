import { IsNotEmpty, IsString } from "class-validator"

export class updateCampus {
    @IsString()
    @IsNotEmpty()
    campusTh: string
}