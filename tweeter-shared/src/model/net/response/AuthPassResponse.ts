import { IsValidResponse } from "./IsValidResponse";
import { AuthDto } from "../../dto/AuthDto";
import { UserDto } from "../../dto/UserDto";

export interface AuthPassResponse extends IsValidResponse {
    readonly authToken : AuthDto | null,
    readonly user : UserDto | null
}