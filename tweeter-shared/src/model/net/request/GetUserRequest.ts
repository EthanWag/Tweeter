import { NoAuthTweeterRequest } from "./NoAuthTweeterRequest";

export interface GetUserRequest extends NoAuthTweeterRequest{
    alias: string;
}