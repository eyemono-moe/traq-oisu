import Elysia from "elysia";
import { lists } from "./lists";
import { receptions } from "./receptions";

export const api = new Elysia({ prefix: "/api" }).use(lists).use(receptions);
