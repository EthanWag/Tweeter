import { UserDto } from '../../dto/UserDto';
import { CountItemRequest } from './CountItemRequest';

export interface CountFollowRequest extends CountItemRequest<UserDto> {
}