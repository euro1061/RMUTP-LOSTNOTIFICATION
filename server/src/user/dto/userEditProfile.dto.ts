import { Type } from "class-transformer";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
export class UserProfileEdit {
    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    lineId: string;

    @IsString()
    @IsOptional()
    facebookUrl: string;

    @Type(() => Number)
    @IsInt({
        message: "roleId ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsNotEmpty()
    role_id: number

    @Type(() => Number)
    @IsInt({
        message: "department_id ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsNotEmpty()
    department_id: number


    @Type(() => Number)
    @IsInt({
        message: "prefixId ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    prefix_id: number

    @IsString()
    @IsOptional()
    urlPicture: string;
}