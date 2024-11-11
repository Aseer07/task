import bcrypt from "bcrypt"
export const passwordEncrypt = async(password)=>{
    const saltRounds =await bcrypt.genSalt(7)
    const hashedPass = await bcrypt.hash(password,saltRounds)
    return hashedPass
}