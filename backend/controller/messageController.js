import Message from '../models/messageModle'
import Chat from '../models/chatModel'

export const sendMessage = async (req, res) => {
    try {
        const { chatId, sender, text } = req.body;

        if (!chatId || !sender || !text) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = await Message.create({
            chatId,
            sender,
            text
        });

        await newMessage.populate('sender', 'name email');

        await Chat.findByIdAndUpdate(chatId, {
            latestMessage: {
                text: text,
                sender: sender
            }
        });

        const chat = await Chat.findById(chatId);
        if (chat) {
            const receiverId = chat.users.find(userId => userId.toString() !== sender.toString());
            
            if (receiverId) {
                const receiverSocketId = getReceiverSocketId(receiverId);
                const io = getIO();

                if (receiverSocketId && io) {
                    io.to(receiverSocketId).emit('newMessage', {
                        id: newMessage._id,
                        chatId: newMessage.chatId,
                        sender: {
                            _id: newMessage.sender._id,
                            name: newMessage.sender.name,
                            email: newMessage.sender.email
                        },
                        text: newMessage.text,
                        timestamp: newMessage.createdAt
                    });
                }
            }
        }

        return res.status(200).json({
            message: "Message sent",
            data: newMessage
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        });
    }
};

export const getMessagebyChatId = async(req, res) =>{
    try{
        const {chatId} = req.params

        if(!chatId){
            return res.status(400).json({message :"chat not found "})
        }   

        const messages = await Message.find({chatId})
            .populate("sender", "name email")
            .sort({createdAt : -1})

        return res.status(200).json({
            message: "Message fetch",
            data: messages
        })


    }catch (error){
        return res.status(500).json({message: "Something went wrong",error})
    }
}
export const deleteMessage = async (req, res) =>{
    try{
        const {messageId} = req.params

        await Message.findByIdAndDelete(messageId);
        
        return res.status(200).json({message : "Message Deleted"})
    }catch(error){
        res.status(500).json({message : "Something went wrong",error})
    }
}