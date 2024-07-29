export class Member {
  constructor(
    public code: string,
    public name: string,
    public borrowedBooks: string[] = [],
    public penaltyUntil?: Date,
  ) {}

  canBorrow(): boolean {
    return (
      this.borrowedBooks.length < 2 &&
      (!this.penaltyUntil || this.penaltyUntil < new Date())
    );
  }

  borrowBook(bookCode: string): void {
    if (this.canBorrow()) {
      this.borrowedBooks.push(bookCode);
    } else {
      throw new Error('Cannot borrow more books');
    }
  }

  returnBook(bookCode: string): void {
    const index = this.borrowedBooks.indexOf(bookCode);
    if (index > -1) {
      this.borrowedBooks.splice(index, 1);
    } else {
      throw new Error('Book not borrowed by this member');
    }
  }
}
