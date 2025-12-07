import mongoose from 'mongoose'

const messageSchema =  new mongoose.Schema({
    chatId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Chat',
        require : true
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        require : true
    },
    text : {
        type : String,
        require : true,
        trim : true
    }
},{
    timestamps : true
})

const Message = mongoose.model('Message', messageSchema);

export default Message