const userRef = ['photo', 'first_name', 'last_name', 'email', 'mobile_number', 'password', 'role']

const sortReqBody = (obj : any, type : string) => {
    if (type === 'user') userRef.map(key => obj[key])
    return;
}

export default sortReqBody