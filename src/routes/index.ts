import Elysia from "elysia";
import { api } from "./api";

export const routes = new Elysia().use(api);
