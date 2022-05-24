import crypto from "crypto";
import { MissingParamError } from "../errors/missing-param-error";
import { TokenGenerator } from "./token-generator";

const makeSut = () => {
    return new TokenGenerator();
};

describe("Token generator", () => {
    it("should throw an error when no id is provided", async () => {
        const sut = makeSut();
        const promise = sut.generate("");

        expect(promise).rejects.toThrow(new MissingParamError("id"));
    });

    it("should be able to generate a token", async () => {
        const sut = makeSut();
        const token = await sut.generate(crypto.randomUUID());

        expect(token).toBeTruthy();
    });
});
