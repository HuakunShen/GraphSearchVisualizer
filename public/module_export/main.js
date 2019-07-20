import User, {printName as pn, printAge} from './user.js'

const user = new User('Bob', 11)
console.log(user)

pn(user)
printAge(user)