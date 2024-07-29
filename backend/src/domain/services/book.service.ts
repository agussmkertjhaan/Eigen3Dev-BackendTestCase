import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';
import { Book } from '../entities/book.entity';
import { BookBorrowedEvent } from '../events/book-borrowed.event';
import { BookReturnedEvent } from '../events/book-returned.event';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly memberRepository: MemberRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  borrowBook(memberCode: string, bookCode: string): void {
    const member = this.memberRepository.findByCode(memberCode);
    const book = this.bookRepository.findByCode(bookCode);

    if (!member || !book || book.stock < 1) {
      throw new Error('Cannot borrow book');
    }

    member.borrowBook(bookCode);
    book.stock -= 1;

    this.memberRepository.save(member);
    this.bookRepository.save(book);

    this.eventEmitter.emit(
      'book.borrowed',
      new BookBorrowedEvent(memberCode, bookCode),
    );
  }

  returnBook(memberCode: string, bookCode: string): void {
    const member = this.memberRepository.findByCode(memberCode);
    const book = this.bookRepository.findByCode(bookCode);

    if (!member || !book) {
      throw new Error('Cannot return book');
    }

    const borrowedDate = new Date();
    const returnedLate =
      (new Date().getTime() - borrowedDate.getTime()) / (1000 * 3600 * 24) > 7;

    member.returnBook(bookCode);
    book.stock += 1;

    if (returnedLate) {
      member.penaltyUntil = new Date(
        new Date().getTime() + 3 * 24 * 3600 * 1000,
      );
    }

    this.memberRepository.save(member);
    this.bookRepository.save(book);

    this.eventEmitter.emit(
      'book.returned',
      new BookReturnedEvent(memberCode, bookCode, returnedLate),
    );
  }

  getAllBooks(): Book[] {
    return this.bookRepository.findAll();
  }
}
