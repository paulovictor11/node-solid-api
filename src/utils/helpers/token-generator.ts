import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { MissingParamError } from "../errors/missing-param-error";

dotenv.config();

export class TokenGenerator {
    async generate(id: string) {
        if (!id) {
            throw new MissingParamError("id");
        }

        return jwt.sign(id, process.env.JWT_SECRET!);
    }
}
