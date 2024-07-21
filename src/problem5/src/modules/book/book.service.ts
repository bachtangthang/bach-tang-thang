import { Book } from './book.entity';
import CreateBookDto from './book.dto';
import BookRepository from './book.repository';
import { Filter, Filters, SortOrder } from 'interface/filter.interface';

class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  public async getAllBooks(filters: Filters, columns: string[], order: string, page: number, limit: number, sort: SortOrder): Promise<{ books: Book[]; rowCount: number; }> {
    return await this.bookRepository.getAllBooks(filters, columns, order, page, limit, sort);
  }

  public async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.getBookById(id);
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    return await this.bookRepository.createBook(bookData);
  }

  public async modifyBook(id: number, bookData: Book): Promise<Book | null> {
    return await this.bookRepository.updateBook(id, bookData);
  }

  public async deleteBook(id: number): Promise<boolean> {
    return await this.bookRepository.deleteBook(id);
  }
}

export default BookService;