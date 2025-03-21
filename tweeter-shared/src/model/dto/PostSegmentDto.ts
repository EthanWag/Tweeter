import { Type } from "../domain/PostSegment";

export interface PostSegmentDto {
    readonly text: string,
    readonly startPostion: number,
    readonly endPostion: number,
    readonly type: Type
}