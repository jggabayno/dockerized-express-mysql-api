export const getValidationsInteractor= async (
    { getValidationsPersistence }: { getValidationsPersistence: any},
    { take } : { take: number }
) => {

    const user: any = await getValidationsPersistence({ take: 10 })
    
    return user

}