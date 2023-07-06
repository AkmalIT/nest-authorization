import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post) private postModel: typeof Post, private fileService: FilesService){}

    async createPost(dto: CreatePostDto, image: any){
        const fileName = await this.fileService.createFile(image)
        const post = await this.postModel.create({...dto, image: fileName})
        return post
    }
}
