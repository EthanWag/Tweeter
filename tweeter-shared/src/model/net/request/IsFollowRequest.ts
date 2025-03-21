import { UserDto } from "../../dto/UserDto";
import { CountItemRequest } from "./CountItemRequest";

export interface IsFollowRequest extends CountItemRequest<UserDto> {
}