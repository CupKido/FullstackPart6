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
const tasks = client.db("fullstack6").collection("tasks");


// Connection URL and database name
module.exports.getTasks = async (userId) => {
    return await tasks.find({ userId: userId }).toArray();
}

module.exports.getTask = async (userId, taskId) => {
    return await tasks.findOne({ userId: userId, _id : new ObjectId(taskId) });
}

module.exports.createTask = async (userId, title) =>{
    if (!(await Users.getUserById(userId))) return null;
    task = { userId : userId, title : title, completed : false }
    const res = await tasks.insertOne(task);
    return task
}

module.exports.updateTask = async (task) =>{
    task._id = new ObjectId(task.id);
    delete task.id;
    return await tasks.updateOne({_id : new ObjectId(task._id)}, { $set : task});

}

module.exports.deleteTask = async (userId, taskId) =>{
    const results = await tasks.deleteOne({_id: new ObjectId(taskId), userId : userId});
    return results.deletedCount;
}