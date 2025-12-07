import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    users : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage :{
        String : text,

        sender:{
            type: mongoose.Schema.Tpyes.ObjectId,
            ref:"User"
        }
    }
},{
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema);

export default Chat