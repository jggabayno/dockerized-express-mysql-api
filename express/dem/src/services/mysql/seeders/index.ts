import query from "../query"
import user from './user'
import log from './log'
// import formField from "./formField"
// import validationRule from "./validationRule"

(async() => {
    Promise.all([
        await query(user),
        await query(log),
        // await query(formField),
        // await query(validationRule),
        console.log('Seed has been created')
    ])
})()