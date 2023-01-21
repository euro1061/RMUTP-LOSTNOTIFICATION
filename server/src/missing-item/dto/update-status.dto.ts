import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class updateStatus {
    @IsString()
    @IsNotEmpty()
    firstName: string
    
    @IsString()
    @IsOptional()
    lastName?: string

    @IsString()
    @IsOptional()
    remarks?: string
    
    @IsString()
    @IsOptional()
    phone?: string

    @IsString()
    @IsOptional()
    email?: string

    @IsString()
    @IsOptional()
    lineId?: string
    
    @IsString()
    @IsOptional()
    facebookUrl?: string

    @Type(() => Number)
    @IsInt({
        message: "missingItem_id ต้องเป็นตัวเลขเท่านั้น"
    })
    missingItem_id: number
    
    @Type(() => Number)
    @IsInt({
        message: "userMissingItemReceive_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    userMissingItemReceive?: number
}