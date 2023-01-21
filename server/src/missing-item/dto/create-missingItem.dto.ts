import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createMissingItem {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    remarks?: string
    
    @IsString()
    @IsOptional()
    imageItem?: string

    @IsString()
    @IsOptional()
    buildingOther?: string
    
    @IsString()
    @IsOptional()
    roomOther?: string

    @Type(() => Number)
    @IsInt({
        message: "userId ต้องเป็นตัวเลขเท่านั้น"
    })
    user_id: number

    @Type(() => Number)
    @IsInt({
        message: "statusMissing_Id ต้องเป็นตัวเลขเท่านั้น"
    })
    statusMissing_id: number

    @Type(() => Number)
    @IsInt({
        message: "campus_id ต้องเป็นตัวเลขเท่านั้น"
    })
    campus_id: number

    @Type(() => Number)
    @IsInt({
        message: "userMissingItemDrop_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    userMissingItemDrop_id?: number

    @Type(() => Number)
    @IsInt({
        message: "userMissingItemReceived_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    userMissingItemReceived_id?: number

    @Type(() => Number)
    @IsInt({
        message: "building_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    building_id?: number

    @Type(() => Number)
    @IsInt({
        message: "room_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    room_id?: number

    @IsString()
    @IsOptional()
    firstNameDrop?: string
    
    @IsString()
    @IsOptional()
    lastNameDrop?: string
    
    @IsString()
    @IsOptional()
    phoneDrop?: string

    @IsString()
    @IsOptional()
    emailDrop?: string

    @IsString()
    @IsOptional()
    lineIdDrop?: string
    
    @IsString()
    @IsOptional()
    facebookUrlDrop?: string
}