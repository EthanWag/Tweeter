import { StatusDto } from "../../dto/StatusDto";
import { NoAuthTweeterRequest } from "./NoAuthTweeterRequest";

export interface PostRequest extends NoAuthTweeterRequest {
    alias: string,
    post: StatusDto
}