import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoResources } from "./DynamoResources";
import { FollowersDAO } from '../../DAOInterfaces/FollowersDAO';
import { User } from "tweeter-shared";