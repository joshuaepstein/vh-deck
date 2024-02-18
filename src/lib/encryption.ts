import bcrypt from './bcrypt'

export async function hashPassword(password: string): Promise<string> {
    const salt = process.env.SALT
    return await hash(password, parseInt(salt))
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword)
}

function hash(password: string, saltRounds: number): Promise<string> {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err: any, hash: string) {
            if (err) reject(err)
            resolve(hash)
        })
    })
}

function compare(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, function (err: any, result: boolean) {
            if (err) reject(err)
            resolve(result)
        })
    })
}
