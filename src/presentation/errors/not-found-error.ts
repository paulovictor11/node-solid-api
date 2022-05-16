export class NotFoundError extends Error {
    constructor(model: string) {
        super(`Unable to find ${model}`);
    }
}
