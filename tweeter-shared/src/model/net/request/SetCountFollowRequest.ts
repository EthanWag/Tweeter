import { CountFollowRequest } from "./CountFollowRequest";

export interface SetCountFollowRequest extends CountFollowRequest{
    readonly count: number;
}