import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class createRoom {
    @IsString()
    @IsNotEmpty()
    roomTh: string

    @Type(() => Number)
    @IsInt({
        message: "building_id ต้องเป็นตัวเลขเท่านั้น"
    })
    building_id: number
}