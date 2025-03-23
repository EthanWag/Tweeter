import { StatusDto } from "../../dto/StatusDto";
import { CountItemRequest } from "./CountItemRequest";

export interface PostStatusRequest extends CountItemRequest<StatusDto> {
}