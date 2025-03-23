import { IsFollowRequest } from "./IsFollowRequest";

export interface SetIsFollowerRequest extends IsFollowRequest {
    readonly doesFollow: boolean
}