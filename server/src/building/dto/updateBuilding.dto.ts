import { IsNotEmpty, IsString } from "class-validator"

export class updateBuilding {
    @IsString()
    @IsNotEmpty()
    buildingTh: string
}