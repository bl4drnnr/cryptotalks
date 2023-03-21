export class CreatePostEvent {
  constructor(private readonly title: string) {}

  toString() {
    return JSON.stringify({
      title: this.title
    });
  }
}
