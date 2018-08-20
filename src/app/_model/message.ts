export class Message {

  constructor(
    public status: number,
    public message: string
  ) {}

getStatus(): number {
    return this.status;
  }

setStatus(status: number) {
    this.status = status;
  }

getMessage(): string {
    return this.message;
  }

setMessage(message: string) {
    this.message = message;
  }

}
