import statement from '../../../constants/statements'

const validationRule = {
    field_id: 1,
    validation_type: 'required',
    validation_rule: null,
    validation_pattern: null,
    validation_message: 'First Name is required.',
}

export default {
    data: Object.values(validationRule),
    statement: statement.CREATE_VALIDATION_RULE
}