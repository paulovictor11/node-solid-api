import { MissingParamError } from "../errors";
import validator from "validator";

export class EmailValidator {
    isValid(email: string) {
        if (!email) {
            throw new MissingParamError("email");
        }

        return validator.isEmail(email);
    }
}
