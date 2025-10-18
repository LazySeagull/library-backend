let users = [];
let nextID = 1;

async function findUserByEmail(email){
    return users.find(u => u.email = email) || null;

}

async function createUser({name , email , passwordHash , role}){
    const user = {id : nextID ++ , name , email , passwordHash , role};
    users.push(user);
    return user;
}

module.exports = {findUserByEmail , createUser};
