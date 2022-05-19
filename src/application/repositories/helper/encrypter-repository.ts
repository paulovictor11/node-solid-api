export interface IEncrypterRepository {
    compare(value: string, hash: string): Promise<boolean>;
    encrypt(value: string): Promise<string>;
}
