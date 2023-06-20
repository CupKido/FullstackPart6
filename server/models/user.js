const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_DB_CONNECTION_STRING

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const users = client.db("fullstack6").collection("users");
// async function getCollection(callback){
//     await client.connect();
//     const tasks = await client.db("fullstack6").collection("users");
//     const res = await callback(tasks)
//     await client.close();
//     return res;
// }



module.exports.getUser = async (username, password) => {
    // return await getCollection(async (users) => {
        let user = await users.findOne({username : username, password : password})
        if (!user) return null
        delete user.password
        return user
    // })
}

module.exports.getUserById = async (userId) => {
    // return await getCollection(async (users) => {
        let user = await users.findOne({_id : new ObjectId(userId)})
        if (!user) return null
        delete user.password
        return user
    // })
}

module.exports.createUser = async (username, firstName, lastName, password) => {
    

    const user = {username : username, firstName : firstName, lastName : lastName, password : password}
    const status = await users.insertOne(user)
    if (status.acknowledged){
        delete user.password
        return user
    }else{
        return null
    }
}

module.exports.deleteUser = async (userId) => {
    return (await users.deleteOne({_id : new ObjectId(userId)})).deletedCount

}


