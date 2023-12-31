import { Model, Table, Column, DataType, BelongsToMany, HasMany } from "sequelize-typescript";
import { Post } from "src/post/post.model";
import { Role } from "src/roles/role.model";
import { UserRoles } from "src/roles/user-roles-model";

interface UserCreationAttrs{
    email: string,
    password: string
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, allowNull: false})
    password: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}