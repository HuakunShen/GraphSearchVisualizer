export default class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
} 

export function printName(user) {
    console.log(`User's name is ${user.name}`);
}

export function printAge(user) {
    console.log(`User is ${user.age} years old`);
}

// export default User
// export {printName, printAge}