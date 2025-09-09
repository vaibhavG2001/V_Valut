const {z} =require("zod")


const nameschema=z.string()

let username=z.string().min(1,"Minimum 1 is required").max(10,"Please Enter less than 10")

console.log(username.safeParse("456sdasdsdadsdsadsad"))
