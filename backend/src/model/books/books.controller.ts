import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDTO } from './books.dto';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BooksService) { }

    @Get()
    findAll(): Promise<any[]> {
        return this.bookService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<any> {
        return this.bookService.findById(id);
    }

    @Post()
    create(@Body() bookDTO: BooksDTO) {
        return this.bookService.create(bookDTO);
    }
}
