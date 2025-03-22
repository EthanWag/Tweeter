import { NoAuthTweeterRequest } from "./NoAuthTweeterRequest";

export interface LoginRequest extends NoAuthTweeterRequest {
    readonly alias: string;
    readonly password: string;
}