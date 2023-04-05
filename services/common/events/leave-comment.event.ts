import { LeaveCommentEventDto } from '../event-dto/leave-comment.event.dto';

export class LeaveCommentEvent {
  constructor(private readonly leaveCommentPayload: LeaveCommentEventDto) {}

  toString() {
    return JSON.stringify({});
  }
}
