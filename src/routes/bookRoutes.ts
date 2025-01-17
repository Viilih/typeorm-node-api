import { Router } from "express";
import { bookRouter } from "../controllers/bookController";

const routers = Router();

routers.use(bookRouter);

export default routers;
