import { Router, Request, Response, NextFunction } from "express";
import { bookSchema } from "../schemas";
import BookRepository from "../repositories/BookRepository";
import { BookDTO } from "../dtos/book/insert-book-dto";

const baseRoute = "/book";
export const bookRouter = Router();

bookRouter.post(
  `${baseRoute}/insertBook`,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { error } = bookSchema.createSchema.validate(request.body, {
        abortEarly: false,
      });

      if (error) {
        response.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      const res = await BookRepository.createBook(request.body);
      response
        .status(200)
        .json({ payload: request.body, responseFromRepo: res });
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.get(
  `${baseRoute}/getBooks`,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const res = await BookRepository.getBooks();
      response.status(200).json(res);
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.put(
  `${baseRoute}/editBook/:bookId`,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log(Number(request.params.bookId));
      const paramsValidation = bookSchema.idSchema.validate(
        { id: Number(request.params.bookId) },
        {
          abortEarly: false,
        }
      );

      if (paramsValidation.error) {
        response.status(400).json({
          status: "error",
          message: "Validation failed on the id",
          errors: paramsValidation.error.details.map((err) => err.message),
        });
      }

      const bodyValidation = bookSchema.updateSchema.validate(request.body, {
        abortEarly: false,
      });

      if (bodyValidation.error) {
        response.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: bodyValidation.error.details.map((err) => err.message),
        });
      }

      const bookId = Number(request.params.bookId);
      const bookDto: BookDTO = request.body;
      const updatedBook = await BookRepository.updateBook(bookId, bookDto);
      response.status(200).json(updatedBook);
    } catch (error) {
      next(error);
    }
  }
);

bookRouter.delete(
  `${baseRoute}/:bookId`,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { error } = bookSchema.idSchema.validate(
        { id: Number(request.params.bookId) },
        {
          abortEarly: false,
        }
      );

      if (error) {
        response.status(400).json({
          status: "error",
          message: "Validation failed",
          errors: error.details.map((err) => err.message),
        });
      }

      const bookId = Number(request.params.bookId);
      await BookRepository.deleteBook(bookId);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);
