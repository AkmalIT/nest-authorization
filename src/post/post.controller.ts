import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {

    constructor(private postService: PostService){}

    @UseInterceptors(FileInterceptor("image"))
    @Post()
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image){
        return this.postService.createPost(dto, image)
    }
}
