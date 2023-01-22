import BaseError from "./BaseError"
import ErrorConstants from "../ErrorConstants"

export default class InvalidParamsError extends BaseError {
  constructor() {
    super(ErrorConstants.GENERIC.INVALID_PARAMS.type, ErrorConstants.GENERIC.INVALID_PARAMS.message)
  }
}
