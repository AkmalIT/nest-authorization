import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from "@nestjs/jwt"
import * as bcrypt from "bcrypt"
import { User } from 'src/users/users.model';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService){}

    async registration(dto: CreateUserDto){
        const condidate = await this.userService.getUserByEmail(dto.email)
        if(condidate){
            throw new HttpException("пользователь с таким email существует", HttpStatus.BAD_REQUEST)
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.create({...dto, password: hashedPassword})
        return this.generateToken(user)
    }

    async login(dto: CreateUserDto){
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    private async generateToken(user: User){
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: CreateUserDto){
        const user = await this.userService.getUserByEmail(dto.email)
        const password = await bcrypt.compare(dto.password, user.password)
        if(user && password){
            return user
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }
}
