import { Request, Response } from "express";

export interface IControllerRepository {
    handle(request: Request, response: Response): Promise<Response>;
}
