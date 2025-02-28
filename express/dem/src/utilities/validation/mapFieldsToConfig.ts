export interface ValidationConfigInterface {
  fields: FieldsInterface[]
}

export interface FieldsInterface {
  name: string,
  type: string,
  validations: ValidationInterface[]
}

export interface ValidationInterface {
  type: string;
  pattern?: string | RegExp;
  value?: string | number;
  message: string;
}

export default function mapFieldsToConfig(formFields : any, validationRules : any) : any {
  return formFields.map((formField : any) => {
    const matchingValidationRule = validationRules.find(
      (rule : any) => rule.field_id === formField.id
    );

    return {
      name: formField.field_name,
      type: formField.field_type,
      validations: [
        {
          type: matchingValidationRule.validation_type,
          value: matchingValidationRule.validation_value,
          pattern: matchingValidationRule.validation_pattern,
          message: matchingValidationRule.validation_message,
        },
      ],
    };
  });
}
// if (this?.password?.length && !(/\d/.test(this?.password))) errors.push({field: 'password', message: 'This field should contains at least 1 digit'})
// if (this?.password?.length && !(/.*[a-z].*/.test(this?.password))) errors.push({field: 'password', message: 'This field should contains at least 1 lower character'})
// if (this?.password?.length && !(/.*[A-Z].*/.test(this?.password))) errors.push({field: 'password', message: 'This field should contains at least 1 upper character'})
// if (this?.password?.length && !(/[*@!#%&()^~{}]+/.test(this?.password))) errors.push({field: 'password', message: 'This field should contains at least 1 symbol @!#%&()^~{}'})