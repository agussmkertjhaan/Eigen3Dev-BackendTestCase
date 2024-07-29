import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Book } from '../entities/book.entity';
import { Member } from '../entities/member.entity';

describe('BookService', () => {
  let service: BookService;
  let bookRepository: BookRepository;
  let memberRepository: MemberRepository;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService, BookRepository, MemberRepository, EventEmitter2],
    }).compile();

    service = module.get<BookService>(BookService);
    bookRepository = module.get<BookRepository>(BookRepository);
    memberRepository = module.get<MemberRepository>(MemberRepository);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should borrow a book', () => {
    const book = new Book('JK-45', 'Harry Potter', 'J.K Rowling', 1);
    const member = new Member('M001', 'Angga');
    jest.spyOn(bookRepository, 'findByCode').mockReturnValue(book);
    jest.spyOn(memberRepository, 'findByCode').mockReturnValue(member);
    const emitSpy = jest.spyOn(eventEmitter, 'emit');

    service.borrowBook(member.code, book.code);

    expect(member.borrowedBooks).toContain(book.code);
    expect(book.stock).toBe(0);
    expect(emitSpy).toHaveBeenCalledWith('book.borrowed', expect.any(Object));
  });

  it('should return a book', () => {
    const book = new Book('JK-45', 'Harry Potter', 'J.K Rowling', 0);
    const member = new Member('M001', 'Angga', ['JK-45']);
    jest.spyOn(bookRepository, 'findByCode').mockReturnValue(book);
    jest.spyOn(memberRepository, 'findByCode').mockReturnValue(member);
    const emitSpy = jest.spyOn(eventEmitter, 'emit');

    service.returnBook(member.code, book.code);

    expect(member.borrowedBooks).not.toContain(book.code);
    expect(book.stock).toBe(1);
    expect(emitSpy).toHaveBeenCalledWith('book.returned', expect.any(Object));
  });
});
