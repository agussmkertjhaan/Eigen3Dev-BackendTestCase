import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookService } from 'src/domain/services/book.service';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  @ApiOperation({ summary: 'Borrow a book' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        memberCode: { type: 'string' },
        bookCode: { type: 'string' },
      },
    },
  })
  @Post('borrow')
  borrowBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    this.bookService.borrowBook(memberCode, bookCode);
  }

  @ApiOperation({ summary: 'Return a book' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        memberCode: { type: 'string' },
        bookCode: { type: 'string' },
      },
    },
  })
  @Post('return')
  returnBook(
    @Body('memberCode') memberCode: string,
    @Body('bookCode') bookCode: string,
  ) {
    this.bookService.returnBook(memberCode, bookCode);
  }
}
