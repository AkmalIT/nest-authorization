import { Model, Table, Column, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { Role } from "src/roles/role.model";
import { User } from "src/users/users.model";

interface PostCreationAttrs{
    title: string,
    desciption: string,
    userId: number;
    image: string;
}

@Table({tableName: "posts"})
export class Post extends Model<Post, PostCreationAttrs>{
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string

    @Column({type: DataType.STRING, allowNull: false})
    desciption: string

    @Column({type: DataType.STRING})
    image: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number

    @BelongsTo(() => User, )
    author: User
}