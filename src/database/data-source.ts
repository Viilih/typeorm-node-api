import "reflect-metadata";
import { DataSource } from "typeorm";
import { DATABASE } from "../config/config";
import { Book } from "../entities/Book";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DATABASE.HOST,
  port: DATABASE.PORT,
  username: DATABASE.USERNAME,
  password: DATABASE.PASSWORD,
  database: DATABASE.NAME,
  synchronize: true,
  logging: false,
  entities: [Book],
  migrations: [],
  subscribers: [],
});
