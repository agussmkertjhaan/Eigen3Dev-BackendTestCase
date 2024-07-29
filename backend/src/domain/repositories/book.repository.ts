import { Book } from '../entities/book.entity';

export class BookRepository {
  private books: Book[] = [
    new Book('JK-45', 'Harry Potter', 'J.K Rowling', 1),
    new Book('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
    new Book('TW-11', 'Twilight', 'Stephenie Meyer', 1),
    new Book(
      'HOB-83',
      'The Hobbit, or There and Back Again',
      'J.R.R. Tolkien',
      1,
    ),
    new Book('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1),
  ];

  findAll(): Book[] {
    return this.books;
  }

  findByCode(code: string): Book | undefined {
    return this.books.find((book) => book.code === code);
  }

  save(book: Book): void {
    const index = this.books.findIndex((b) => b.code === book.code);
    if (index > -1) {
      this.books[index] = book;
    } else {
      this.books.push(book);
    }
  }
}
