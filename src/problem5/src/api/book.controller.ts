// Libraries
import express, { Request, Response, Router, NextFunction } from "express";
import Controller from '../interface/controller.interface';
import HttpException from '../response/HttpException';
import HttpResponse from "../response/HttpResponse";

// DTOs
import CreateBookDto from '../modules/book/book.dto';

// Services
import BookService from '../modules/book/book.service';

// Entities
import { Book } from '../modules/book/book.entity';
import { Filter, Filters } from 'interface/filter.interface';

class BookController implements Controller {
  public path = '/books';
  public router = Router();
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.getAllBooks);
    this.router.get(`${this.path}/:id`, this.getBookById);
    this.router.post(`${this.path}/create`, this.createBook);
    this.router.put(`${this.path}/:id`, this.modifyBook);
    this.router.delete(`${this.path}/:id`, this.deleteBook);
  }

  private createBook = async (request: Request, response: Response) => {
    const bookData: CreateBookDto = request.body;
    const newBook = await this.bookService.createBook(bookData);
    response.json(new HttpResponse(200, "success", { total: 1, data: [newBook] }));
  }

  private getAllBooks = async (request: Request, response: Response) => {
    const { filters, columns, order, page, limit, sort } = request.body
    const { books, rowCount } = await this.bookService.getAllBooks(filters, columns, order, page, limit, sort);
    response.json(new HttpResponse(200, "success", { total: rowCount, data: books }));
  }

  private getBookById = async (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id, 10);
    const book = await this.bookService.getBookById(id);
    if (book) {
      response.send(book);
    } else {
      next(new HttpException(404, `There no book with id ${id}`));
    }
  }

  private modifyBook = async (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id, 10);
    const bookData: Book = request.body;
    const book = await this.bookService.getBookById(id);
    if (!book) next(new HttpException(404, `There no book with id ${id}`));

    const updatedBook = await this.bookService.modifyBook(id, bookData);
    if (updatedBook) {
      response.send(updatedBook);
    } else {
      next(new HttpException(500, 'Internal Server Error'));
    }
  }

  private deleteBook = async (request: Request, response: Response, next: NextFunction) => {
    const id = parseInt(request.params.id, 10);
    const book = await this.bookService.getBookById(id);
    if (!book) next(new HttpException(404, `There no book with id ${id}`));

    const isDeleted = await this.bookService.deleteBook(id);
    if (isDeleted) {
      response.sendStatus(200);
    } else {
      next(new HttpException(500, 'Internal Server Error'));
    }
  }
}

export default BookController;