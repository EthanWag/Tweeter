export class Error {
    private _message: string;

    public constructor(message: string) {
        this._message = message;
    }

    public get message(): string {
        return this._message;
    }
}