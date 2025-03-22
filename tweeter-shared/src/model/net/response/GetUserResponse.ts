import { UserDto } from "../../dto/UserDto";
import { TweeterResponse } from "./TweeterResponse";

export interface GetUserResponse extends TweeterResponse {
    readonly found: boolean;
    readonly user: UserDto | null;    
}