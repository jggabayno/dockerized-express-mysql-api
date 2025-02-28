import query from '@services/mysql/query'
import statement from '@constants/statements'
import mapFieldsToConfig, { ValidationConfigInterface } from '@utilities/validation/mapFieldsToConfig'

export type IGetValidationsPersistence = typeof getValidationsPersistence

export const getValidationsPersistence = async (
    queryBody: { take: number }
): Promise<any[]> => {

  const formFields = await query({statement: statement.SELECT_FORM_FIELDS, data: queryBody })
  const validationRules = await query({statement: statement.SELECT_VALIDATION_RULES, data: queryBody })

  const validationConfig : ValidationConfigInterface = {
    fields: mapFieldsToConfig(formFields, validationRules),
  }

  return validationConfig.fields

}