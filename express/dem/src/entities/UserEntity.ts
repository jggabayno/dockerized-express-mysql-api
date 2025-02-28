import { UserInterface } from "@interfaces/UserInterface"
import filterAndMapValidationFields from "@utilities/validation/filterAndMapValidationFields"
import validateAndThrowErrors from "@utilities/validation/validateAndThrowErrors"

export class UserEntity {
    photo?: string
    first_name: string
    last_name: string
    email: string
    mobile_number: string
    password?: string | undefined
    role: string

    constructor(
        { photo, first_name, last_name, email, mobile_number, password, role }: UserInterface
    ) {
        this.photo         = photo
        this.first_name    = first_name
        this.last_name     = last_name
        this.email         = email
        this.mobile_number = mobile_number
        this.password      = password
        this.role          = role
    }

    async validate(type : string) {

        if (type === 'create') {

            const validationRules = {
                photo: ['required'],
                first_name: ['required'],
                last_name: ['required'],
                email: ["required", "regex"],
                mobile_number: ['required'],
                password: ["required", "minLength", "maxLength"],
                role: ['required']
            }

            validateAndThrowErrors(this, validationRules)
            
        }

        if (type === 'update') {

            const validationRules = {
                photo: ['required'],
                first_name: ['required'],
                last_name: ['required'],
                email: ["required", "regex"],
                mobile_number: ['required'],
                role: ['required']
            }

            validateAndThrowErrors(this, validationRules)
            
        }
    }
}