import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger";
export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: "อีเมล"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: "รหัสนักศึกษา"})
    stuId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: "รหัสผ่าน"})
    password: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: "ชื่อจริง"})
    firstName: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: "นามสกุล"})
    lastName: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: "เบอร์โทร"})
    phone: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: "Line ID"})
    lineId: string;
    
    @IsString()
    @IsOptional()
    @ApiProperty({type: String, description: "Facebook Url"})
    facebookUrl: string;
    
    
    @Type(() => Number)
    @IsInt({
        message: "prefixId ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    @ApiProperty({type: String, description: "รหัสคำนำหน้า"})
    prefix_id: number

    @Type(() => Number)
    @IsInt({
        message: "roleId ต้องเป็นตัวเลขเท่านั้น"
    })
    @IsOptional()
    @ApiProperty({type: String, description: "รหัส Role"})
    role_id: number
}