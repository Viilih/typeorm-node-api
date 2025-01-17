import { Expose } from "class-transformer";

export class BookDTO {
  @Expose()
  title: string;

  @Expose()
  author: string;
}
