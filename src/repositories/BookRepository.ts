import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Book } from "../entities/Book";
import { IBook } from "../interfaces/IBook";
import { BookDTO } from "../dtos/book/insert-book-dto";
import { NotFoundException } from "../exceptions/NotFoundException";

class BookRepository {
  private repository: Repository<Book>;

  constructor() {
    this.repository = AppDataSource.getRepository(Book);
  }

  async getBooks(): Promise<IBook[]> {
    return await this.repository.find();
  }

  async getBookById(id: number): Promise<IBook> {
    const book = await this.repository.findOneBy({
      id,
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async createBook(bookDto: BookDTO): Promise<IBook> {
    const book = this.repository.create({ ...bookDto });
    return await this.repository.save(book);
  }

  async updateBook(id: number, bookDto: BookDTO): Promise<IBook> {
    const book = await this.getBookById(id);
    this.repository.merge(book, bookDto);
    return await this.repository.save(book);
  }

  async deleteBook(id: number): Promise<void> {
    const book = await this.getBookById(id);
    await this.repository.remove(book);
  }
}

export default new BookRepository();
