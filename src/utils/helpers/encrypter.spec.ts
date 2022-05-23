import bcrypt from "bcryptjs";
import { MissingParamError } from "../errors";
import { Encrypter } from "./encrypter";

const hash = async () => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash("12345", salt);
};
const makeSut = new Encrypter();

describe("Encrypter", () => {
    it("should throw an error when no value is provided to compare function", async () => {
        const hashed = await hash();
        const promise = makeSut.compare("", hashed);

        expect(promise).rejects.toThrow(new MissingParamError("value"));
    });

    it("should throw an error when no hash is provided to compare function", async () => {
        const promise = makeSut.compare("12345", "");

        expect(promise).rejects.toThrow(new MissingParamError("hash"));
    });

    it("should return false if params aren't valid", async () => {
        const hashed = await hash();
        const isEqual = await makeSut.compare("123456", hashed);

        expect(isEqual).toBe(false);
    });

    it("should return true if params are valid", async () => {
        const hashed = await hash();
        const isEqual = await makeSut.compare("12345", hashed);

        expect(isEqual).toBe(true);
    });

    it("should throw an error when no value is provided to compare function", async () => {
        const promise = makeSut.encrypt("");

        expect(promise).rejects.toThrow(new MissingParamError("value"));
    });

    it("should be able to encrypt a value", async () => {
        const promise = makeSut.encrypt("12345");

        expect(promise).resolves.not.toThrow();
        expect(await promise).toBeTruthy();
    });
});
