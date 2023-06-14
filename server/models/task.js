const Users = require('./user.js')
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
    await client.connect();
    const tasks = await client.db("fullstack6").collection("tasks");
    const res = await callback(tasks)
    await client.close();
    return res;
}

// Connection URL and database name
module.exports.getTasks = async (userId) => {
    if (!(await Users.getUserById(userId))) return null;
    return await getCollection(async (tasks) => {
        return await tasks.find({ userId: userId }).toArray()
    })
}

module.exports.getTask = async (userId, taskId) => {
    if (!(await Users.getUserById(userId))) return null;
    return await getCollection(async (tasks) => {
        return await tasks.findOne({ userId: userId, _id : new ObjectId(taskId) });
    })
}

module.exports.createTask = async (userId, title) =>{
    if (!(await Users.getUserById(userId))) return null;
    return await getCollection(async (tasks) => {
        task = { userId : userId, title : title, completed : false }
        const res = await tasks.insertOne(task);
        return task
    })
}

module.exports.updateTask = async (task) =>{
    return await getCollection(async (tasks) => {
        task._id = new ObjectId(task.id);
        delete task.id;
        return await tasks.updateOne({_id : new ObjectId(task._id)}, { $set : task});
    })
}

module.exports.deleteTask = async (userId, taskId) =>{
    return await getCollection(async (tasks) => {
        return await tasks.deleteOne({_id: new ObjectId(taskId), userId : userId});;
    })
}