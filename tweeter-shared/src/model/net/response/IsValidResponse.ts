import { TweeterResponse } from "./TweeterResponse";

export interface IsValidResponse extends TweeterResponse {
    readonly valid: boolean
}