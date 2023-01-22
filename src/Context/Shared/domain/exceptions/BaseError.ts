export default class BaseError extends Error {
  readonly type: number

  constructor(type: number, message: string) {
    super(message)
    this.type = type
  }
}
