import { StatusDto } from "../../dto/StatusDto";
import { NoAuthTweeterRequest } from "./NoAuthTweeterRequest";

export interface FeedRequest extends NoAuthTweeterRequest {
    post: StatusDto,
    followeesAlias: string[] 
}