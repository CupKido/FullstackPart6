const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_DB_CONNECTION_STRING

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});
const comments = client.db("fullstack6").collection("comments");

module.exports.getComments = async (postId) => {
    return await comments.find({ postId: postId }).toArray();
}

module.exports.getComment = async (postId, commentId) => {
    return await comments.findOne({ postId: postId, _id : new ObjectId(commentId) });
}

module.exports.createComment = async (postId, name, body) => {
    comment = { postId : postId, name, body }
    const res = await comments.insertOne(comment);
    return comment
}

module.exports.updateComment = async (postId, commentId, name, body) => {
    comment = { postId : postId, name, body, _id : new ObjectId(commentId) }
    const res = await comments.updateOne({_id : new ObjectId(commentId)}, { $set : comment});
    console.log(res)
    return comment
}

module.exports.deleteComment = async (postId, commentId) => {
    const results = await comments.deleteOne({_id: new ObjectId(commentId), postId : postId});
    return results.deletedCount;
}
    