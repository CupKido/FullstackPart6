const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_DB_CONNECTION_STRING

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function getCollection(callback){
    console.log('connecting to db')
    await client.connect();
    console.log('connected')
    const tasks = await client.db("fullstack6").collection("users");
    console.log('collection found')
    const res = await callback(tasks)
    console.log('callback done')
    console.log('closing connection')
    await client.close();
    console.log('connection closed')
    return res;
}



module.exports.getUser = async (username, password) => {
    return await getCollection(async (users) => {
        let user = await users.findOne({username : username, password : password})
        if (!user) return null
        delete user.password
        return user
    })
}

module.exports.getUserById = async (userId) => {
    return await getCollection(async (users) => {
        console.log('getting user')
        let user = await users.findOne({_id : new ObjectId(userId)})
        console.log('got user', user)
        if (!user) return null
        const { password, ...rest } = user;
        user = rest;
        console.log('deleted password')
        return user
    })
}

module.exports.createUser = async (username, firstName, lastName, password) => {
    if (await module.exports.getUser(username, password)) return null;

    return await getCollection(async (users) => {
        const user = {username : username, firstName : firstName, lastName : lastName, password : password}
        const status = await users.insertOne(user)
        if (status.acknowledged){
            user.id = status.insertedId
            delete user.password
            return user
        }else{
            return null
        }
    })
}

module.exports.deleteUser = async (userId) => {
    return await getCollection(async (users) => {
        return (await users.deleteOne({_id : new ObjectId(userId)})).deletedCount
    })
}


