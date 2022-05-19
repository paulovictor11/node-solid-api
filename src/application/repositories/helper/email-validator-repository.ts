export interface IEmailValidatorRepository {
    isValid(email: string): boolean;
}
