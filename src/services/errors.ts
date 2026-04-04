export class NotFoundError extends Error {
    constructor() { super('Not found') }
}

export class ForbiddenError extends Error {
    constructor() { super('Forbidden') }
}

export class ConflictError extends Error {
    constructor(message: string) { super(message) }
}

export class UnprocessableError extends Error {
    constructor(message: string) { super(message) }
}

export class ExceededMaxPageSizeError extends Error {
    constructor(message: string) { super(message) }
}

export class InvalidValueError extends Error {
    constructor(message: string) { super(message) }
}