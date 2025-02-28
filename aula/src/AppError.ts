export default class AppError extends Error {
    statuscode

    constructor(message: string, statuscode = 400) {
        super(message)
        this.statuscode = statuscode
    }
}