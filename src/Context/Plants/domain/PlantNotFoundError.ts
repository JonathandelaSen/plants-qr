import ErrorConstants from "../../Shared/domain/ErrorConstants"
import BaseError from "../../Shared/domain/exceptions/BaseError"

export default class PlantNotFoundError extends BaseError {
    constructor() {
        super(ErrorConstants.PLANTS.NOT_FOUND.type, ErrorConstants.PLANTS.NOT_FOUND.message)
    }
}
