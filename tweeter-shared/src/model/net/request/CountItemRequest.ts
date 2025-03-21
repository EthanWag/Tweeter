import { TweeterRequest } from "./TweeterRequest";

export interface CountItemRequest<T> extends TweeterRequest {
    user: T
    selectedUser?: T
}