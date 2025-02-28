import statement from '../../../constants/statements'

const formField = {
    field_name: 'first_name',
    field_label: 'First Name',
    field_placeholder: 'Enter your First Name',
    field_type: 'text'
}

export default {
    data: Object.values(formField),
    statement: statement.CREATE_FORM_FIELD
}