import { Type } from "class-transformer"
import { IsInt, IsNotEmpty, IsString } from "class-validator"

export class sendMailDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    phone: string

    @IsString()
    @IsNotEmpty()
    email_sender: string

    @IsString()
    @IsNotEmpty()
    message: string

    @Type(() => Number)
    @IsInt({
        message: "itemId ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsNotEmpty()
    itemId: number

    @Type(() => Number)
    @IsInt({
        message: "itemId ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsNotEmpty()
    typeEmail: number
}