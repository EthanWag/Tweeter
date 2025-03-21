import { TweeterRequest } from "./TweeterRequest";

export interface CountItemRequest<T> extends TweeterRequest {
    readonly user: T
    readonly selectedUser?: T
}