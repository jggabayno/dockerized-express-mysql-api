import { LogInterface } from '@interfaces/LogInterface'
import query from '@services/mysql/query'
import statement from '@constants/statements'

export type GetLogsPersistenceInterface = typeof getLogsPersistence
export type CreateLogPersistenceInterface = typeof createLogPersistence

export const getLogsPersistence = async (
    queryBody: { take: number }
): Promise<LogInterface[]> => {
    const users : LogInterface[] = await query({statement: statement.SELECT_LOGS, data: queryBody })
    return users
}

export const createLogPersistence = async (
    log: LogInterface
): Promise<any> => {

    const newLog = await query({statement: statement.CREATE_LOG, data: log})

    return {
        data: {id: newLog.insertId, ...log},
        error: null
    }

}