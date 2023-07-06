import {IsString, IsEmail, Length} from "class-validator"

export class CreateUserDto{
    

    @IsString({message: "должно быть строкой"})
    @IsEmail({}, {message: "Некоректный Email"})
    readonly email: string

    @IsString({message: "должно быть строкой"})
    @Length(4, 15, {message: "Пароль не может быть меньше 4 и больше 15"})
    readonly password: string
}