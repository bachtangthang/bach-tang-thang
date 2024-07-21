import 'dotenv/config';
import 'reflect-metadata';
import App from './app';
import BookController from './api/book.controller';

(async () => {
  const app = new App(
    [
      new BookController(),
    ],
  );
  app.listen();
})();