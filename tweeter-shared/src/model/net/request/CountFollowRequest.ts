import { User } from '../../domain/User';
import { CountItemRequest } from './CountItemRequest';

export interface CountFollowRequest extends CountItemRequest<User> {
}