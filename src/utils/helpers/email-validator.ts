import { MissingParamError } from "../errors/missing-param-error";
import validator from "validator";
import { IEmailValidatorRepository } from "../../application/repositories/helper/email-validator-repository";

export class EmailValidator implements IEmailValidatorRepository {
    isValid(email: string): boolean {
        if (!email) {
            throw new MissingParamError("email");
        }

        return validator.isEmail(email);
    }
}
