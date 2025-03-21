import { UserDto } from "../../dto/UserDto"
import { TweeterRequest } from "./TweeterRequest"

export interface PagedUserItemRequest extends TweeterRequest {
    readonly lastItem: UserDto | null
}