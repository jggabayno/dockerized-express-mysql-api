import mapFieldsToConfig, { FieldsInterface, ValidationInterface } from "@utilities/validation/mapFieldsToConfig"

export default function filterAndMapValidationFields(validationRules: Record<string, string[]>) {

  return mapFieldsToConfig([]
    // formFields
    , validationRules).fields
  .filter((field: FieldsInterface) => field.validations && validationRules[field.name])
  .map((field: FieldsInterface) => ({
    ...field,
    validations: field.validations.filter((validation: ValidationInterface) => validationRules[field.name].includes(validation.type)),
  }))
  .filter((field: FieldsInterface) => field.validations.length > 0)
}