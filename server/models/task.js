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
    task = { userId : userId, title : title, completed : false }
    const res = await tasks.insertOne(task);
    return task
}

module.exports.updateTask = async (userId, taskId, title, completed) =>{
    task = { userId, _id : new ObjectId(taskId), title, completed};
    return (await tasks.updateOne({_id : new ObjectId(task._id)}, { $set : task})).modifiedCount;

}

module.exports.deleteTask = async (userId, taskId) =>{
    const results = await tasks.deleteOne({_id: new ObjectId(taskId), userId : userId});
    return results.deletedCount;
}