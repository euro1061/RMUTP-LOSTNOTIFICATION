import { IsNotEmpty, IsString } from "class-validator"

export class updateRoom {
    @IsString()
    @IsNotEmpty()
    roomTh: string
}