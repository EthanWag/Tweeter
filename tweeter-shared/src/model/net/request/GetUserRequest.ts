import { NoAuthTweeterRequest } from "./NoAuthTweeterRequest";

export interface GetUserRequest extends NoAuthTweeterRequest{
    readonly alias: string;
}