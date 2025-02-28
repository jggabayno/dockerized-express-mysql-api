import fs from 'fs'

const readFile = (file : string, callback: any) : any =>
    fs.readFile(file, 'utf8', async(err, statement) => {
        try {
            await callback({ statement })
        } catch(err : any) {
            console.error(err.message)
        }
})

export default readFile;