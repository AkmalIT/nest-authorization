import { Body, Controller, Param, Post, Get, UseGuards } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';
import { Roles } from 'src/auth/role-guards-decorators';
import { RolesGuard } from 'src/auth/role-guards';

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService){}

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post()
    createRole(@Body() dto: CreateRoleDto){
        return this.roleService.create(dto)
    }

    @Get('/:value')
    getByValue(@Param('value') value: string){
        return this.roleService.getRole(value)
    }
}
