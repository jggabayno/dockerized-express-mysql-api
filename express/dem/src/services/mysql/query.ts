import connection from "./connection"
import defaultStatement from "../../constants/statements"

interface QueryParams {
    statement: string,
    data?: any
}

const query = async ({ statement, data = {} } : QueryParams) => {

    const [result] : any = await (await connection).execute(statement, Object.values(data))
    
    const isToReturnObject = statement === defaultStatement.SELECT_USER

    return isToReturnObject ? result[0] : result
}

export default query