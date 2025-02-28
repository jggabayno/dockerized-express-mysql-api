import { LogInterface } from "@interfaces/LogInterface"
import { ValidationErrorsInterface } from "@interfaces/ValidationErrorsInterface"
import { stringifyResponse } from "@utilities/responses/stringifyResponse"

export class LogEntity {
    id?: number
    module: string
    content: string
    author_id: number

    constructor(
        { id, module, content, author_id }: LogInterface
    ) {
        this.id        = id
        this.module    = module
        this.content   = content
        this.author_id = author_id
    }

    async validate() {

        let errors : ValidationErrorsInterface[] = []

        if (!this.module)    errors = [...errors, {field: 'module', message: 'module is required'}]
        if (!this.content)   errors = [...errors, {field: 'content', message: 'content is required'}]
        if (!this.author_id) errors = [...errors, {field: 'creator', message: 'creator is required'}]

        if (errors.length) throw new Error(stringifyResponse(null, errors))
    }
}