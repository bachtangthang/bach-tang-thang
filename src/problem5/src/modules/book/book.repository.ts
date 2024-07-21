import { dataSource } from '../../ormConfig';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { buildFilterQuery } from '../../utils/queryBuilder';
import { Filter, Filters, SortOrder } from 'interface/filter.interface';

// DTOs
import CreateBookDto from './book.dto';

class BookRepository {
  private bookRepository: Repository<Book>;

  constructor() {
    this.bookRepository = dataSource.getRepository(Book);
  }

  public async getAllBooks(filters: Filters, columns: string[], order: string, page: number, limit: number, sort: SortOrder): Promise<{ books: Book[]; rowCount: number; }> {   
    // build columns
    columns = (columns || ['id']).map((col) => `book.${col}`)
    columns.push('COUNT (*) AS row_count')
    const queryBuilder = this.bookRepository.createQueryBuilder()
      .select(columns)
      .from(Book, 'book')

    let filterQueries = [];
    if (filters) filterQueries = buildFilterQuery(filters);

    // build filter queries
    if (filterQueries) {
      filterQueries.forEach((filter) => {
        queryBuilder.andWhere(`book.${filter.operand} ${filter.operator}`);
      })
    }

    // limit && page
    if (!page) page = 1;
    if (!limit) limit = 10;
    queryBuilder.limit(limit).offset((page - 1)*limit);

    // sort
    if (!sort) sort = 'DESC';
    if (!order) order = 'id';
    queryBuilder.orderBy(`book.${order}`, sort).groupBy(`book.id`)
    const books = await queryBuilder.execute();
    return {
      books,
      rowCount: books[0]?.row_count || 0
    }
  }

  public async getBookById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }

  public async createBook(bookData: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(bookData);
    return await this.bookRepository.save(newBook);
  }

  public async updateBook(id: number, bookData: Partial<Book>): Promise<Book | null> {
    await this.bookRepository.update(id, bookData);
    return await this.bookRepository.findOneBy({ id });
  }

  public async deleteBook(id: number): Promise<boolean> {
    const deleteResponse = await this.bookRepository.delete(id);
    return deleteResponse.affected > 0;
  }
}

export default BookRepository;