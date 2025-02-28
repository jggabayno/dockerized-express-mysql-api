import {
    LogInterface,
} from '@interfaces/LogInterface'

import {
    GetLogsPersistenceInterface
} from '@persistence/logPersistence'

export const getLogsInteractor = async (
    { getLogsPersistence }: { getLogsPersistence: GetLogsPersistenceInterface},
    { take } : { take: number }
) => {

    const logs: LogInterface[] = await getLogsPersistence({ take })

    return logs

}