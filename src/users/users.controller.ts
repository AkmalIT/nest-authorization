import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/role-guards-decorators';
import { RolesGuard } from 'src/auth/role-guards';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){}

    @Post()
    createUser(@Body() dto: CreateUserDto){
        return this.userService.create(dto)
    }

     @Roles("ADMIN")
     @UseGuards(RolesGuard)
    @Get()
    getAllUsers(){
        return this.userService.getAll()
    }
    
    @Get('/:id')
    getOne(@Param('id') id: number){
        return this.userService.getOne(id)
    }
}
