import { LoginRequest } from "./LoginRequest";

export interface RegisterRequest extends LoginRequest{ 
    readonly firstName: string,
    readonly lastName: string,
    readonly userImageBytes: string, // remember you need to seralize! just don't forget that
    readonly imageFileExtension: string
}