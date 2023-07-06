import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize"
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private usersModel: typeof User,
    private roleService: RolesService
    ){}

    async create(dto: CreateUserDto){
        const user = await this.usersModel.create(dto)
        const role = await this.roleService.getRole("USER")
        user.$set('roles', [role.id])
        user.roles = [role]
        return user
    }

    async getAll(){
        const user = await this.usersModel.findAll({include: {all: true}})
        return user
    }

    async getOne(id){
        const user = await this.usersModel.findOne({where: {id}})
        return user
    }

    async getUserByEmail(email: string){
        const user = await this.usersModel.findOne({where: {email}, include: {all: true}})
        return user
    }
}
