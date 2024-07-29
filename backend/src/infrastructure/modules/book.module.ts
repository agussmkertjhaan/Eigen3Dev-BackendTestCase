import { Module } from '@nestjs/common';
import { BookController } from '../controllers/book.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BookService } from 'src/domain/services/book.service';
import { BookRepository } from 'src/domain/repositories/book.repository';
import { MemberRepository } from 'src/domain/repositories/member.repository';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [BookController],
  providers: [BookService, BookRepository, MemberRepository],
})
export class BookModule {}
