import bcrypt from "bcryptjs";
import { IEncrypterRepository } from "../../application/repositories/helper/encrypter-repository";
import { MissingParamError } from "../errors";

export class Encrypter implements IEncrypterRepository {
    async compare(value: string, hash: string): Promise<boolean> {
        if (!value) {
            throw new MissingParamError("value");
        }

        if (!hash) {
            throw new MissingParamError("hash");
        }

        return await bcrypt.compare(value, hash);
    }

    async encrypt(value: string): Promise<string> {
        if (!value) {
            throw new MissingParamError("value");
        }

        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(value, salt);
    }
}
