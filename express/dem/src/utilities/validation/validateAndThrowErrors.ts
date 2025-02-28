import { stringifyResponse } from "@utilities/responses/stringifyResponse"
import { FieldsInterface, ValidationInterface } from "./mapFieldsToConfig"
import filterAndMapValidationFields from "./filterAndMapValidationFields"

export default function validateAndThrowErrors(row : any, validationRules: Record<string, string[]>
) : any {

  const errors = filterAndMapValidationFields(validationRules)
  .flatMap(({ name, validations } : FieldsInterface) =>
    validations
      .filter((validation : ValidationInterface | any) => {
        const value = row[name]
        switch (validation.type) {
          case 'required':
            return !value.length;
          case 'minLength':
            return value.length < validation.value;
          case 'maxLength':
            return value.length > validation.value;
          case 'regex':
            return !new RegExp(validation.pattern).test(value) && value.length;
          // Add more validation types as needed.
          default:
            return false;
        }
      })
      .map((validation : any) => ({
        field: name,
        message: validation.message
      }))
  )
      
  if (errors.length) {
    throw new Error(stringifyResponse(null, errors))
  }
}