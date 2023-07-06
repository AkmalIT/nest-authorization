import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize"
import { Role } from './role.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleModel: typeof Role){}

    async create(dto: CreateRoleDto){
        const role = await this.roleModel.create(dto)
        return role
    }

    async getRole(value: string){
        const role = await this.roleModel.findOne({where: {value}})
        return role
    }
}
