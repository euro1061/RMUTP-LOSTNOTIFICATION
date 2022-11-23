import { IsNotEmpty, IsString } from "class-validator"
export class searchStudent {
    @IsString()
    @IsNotEmpty()
    nameOrStuId: string;
}