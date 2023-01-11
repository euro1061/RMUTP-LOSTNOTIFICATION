import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class updateLosingItem {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsOptional()
    description?: string
    
    @IsString()
    @IsOptional()
    imageItem?: string


    @Type(() => Number)
    @IsInt({
        message: "userId ต้องเป็นตัวเลขเท่านั้น"
    })
    user_id: number

    // @Type(() => Number)
    // @IsInt({
    //     message: "statusLosingItem_id ต้องเป็นตัวเลขเท่านั้น"
    // })
    // statusLosingItem_id: number

    @Type(() => Number)
    @IsInt({
        message: "campus_id ต้องเป็นตัวเลขเท่านั้น"
    })
    campus_id: number
    
    @Type(() => Number)
    @IsInt({
        message: "userLosingDropId ต้องเป็นตัวเลขเท่านั้น"
    })
    userLosingDropId: number

    @Type(() => Number)
    @IsInt({
        message: "userDrop_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    userDrop_id?: number

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