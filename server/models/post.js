const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_DB_CONNECTION_STRING

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
const posts = client.db("fullstack6").collection("posts");

module.exports.getPosts = async (userId) => {
    return await posts.find({ userId: userId }).toArray();
}

module.exports.getPost = async (userId, postId) => {
    return await posts.findOne({ userId: userId, _id : new ObjectId(postId) });
}

module.exports.getPostById = async (postId) => {
    return await posts.findOne({ _id : new ObjectId(postId) });
}

module.exports.createPost = async (userId, title, body) => {
    post = { userId : userId, title : title, body : body }
    const res = await posts.insertOne(post);
    return post
}

module.exports.updatePost = async (userId, postId, title, body) => {
    post = { userId : userId, title : title, body : body, _id : new ObjectId(postId) }
    const res = await posts.updateOne({_id : new ObjectId(postId)}, { $set : post});
    return res.modifiedCount
}

module.exports.deletePost = async (userId, postId) => {
    const results = await posts.deleteOne({_id: new ObjectId(postId), userId : userId});
    return results.deletedCount;
}
