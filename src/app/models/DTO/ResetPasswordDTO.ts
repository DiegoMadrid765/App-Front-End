
export class ResetPasswordDTO {
    Url: string;
    Password: string;
    ConfirmPassword: string;

    constructor(Url: string, Password: string, ConfirmPassword: string) {
        this.Url = Url;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;

    }
}