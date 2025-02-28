interface IError {
    field: string,
    message: string
}

export const stringifyResponse = (data = null, error : IError[] | null = null) => JSON.stringify({
    data,
    error: error?.map(({ field, message } : IError) => ({ field, message }))
})