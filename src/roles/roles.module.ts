import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from "@nestjs/sequelize"
import { User } from 'src/users/user.model';
import { Role } from './role.model';
import { UserRoles } from './user-roles-model';


@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles])
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
