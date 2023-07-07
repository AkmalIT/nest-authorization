import { IsNumber, IsString } from "class-validator"

export class CreatePostDto{
    @IsString({message: "должно быть строкой"})
    readonly title: string
    @IsString({message: "Должно быть строкой"})
    readonly desciption: string
    readonly userId: number
}