import bcrypt from 'bcryptjs'

export const hash = (value: string = '', hasLength: number = 10) => bcrypt.hash(value, hasLength)
export const compare = (v1: string = '', v2: string = '') => bcrypt.compare(v1, v2)