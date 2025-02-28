export const notAllowedMessage = (
    req: any,
    proxy: string | null = null
) => {

    // assign tag using request base url
    const resource = req?.baseUrl.replace('/api/', '')

    // assign event using request method
    const event = proxy ||
        req.method === 'GET' ? 'view'
        : req.method === 'POST' ? 'create'
            : req.method === 'PUT' ? 'update' : 'remove'

    const content = { message: `Not allowed to ${event} ${resource}` }

    return content

}