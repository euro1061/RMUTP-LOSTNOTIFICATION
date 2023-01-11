import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class createBuilding {
    @IsString()
    @IsNotEmpty()
    buildingTh: string

    @Type(() => Number)
    @IsInt({
        message: "campus_id ต้องเป็นตัวเลขเท่านั้น"
    })
    campus_id: number
}