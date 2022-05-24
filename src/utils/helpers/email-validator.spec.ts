import { MissingParamError } from "../errors/missing-param-error";
import { EmailValidator } from "./email-validator";

const makeSut = () => {
    return new EmailValidator();
};

describe("Email validator", () => {
    it("should throw an error if no email is provided", () => {
        const sut = makeSut();

        expect(() => sut.isValid("")).toThrow(new MissingParamError("email"));
    });

    it("should return false if validator returns false", () => {
        const sut = makeSut();
        const isEmailValid = sut.isValid("test");

        expect(isEmailValid).toBe(false);
    });

    it("should return true if validator return true", () => {
        const sut = makeSut();
        const isEmailValid = sut.isValid("test@email.com");

        expect(isEmailValid).toBe(true);
    });
});
