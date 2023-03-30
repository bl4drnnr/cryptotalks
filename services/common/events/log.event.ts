import { LogEventDto } from '../event-dto/log.event.dto';

export class LogEvent {
  constructor(private readonly logPayload: LogEventDto) {}

  toString() {
    return JSON.stringify({
      ...this.logPayload
    });
  }
}
