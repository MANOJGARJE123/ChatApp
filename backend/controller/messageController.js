import Message from '../models/messageModle'
import Chat from '../models/chatModel'

export const sendMessage = async(req, res) =>{
    try{
        const {chatId, sender, text} = req.body

        if(!chatId || !sender || !text){
            return res.status(400).json({message : "All feilds are required"})
        }

        const newMessage = await Message.create({
            chatId,
            sender,
            text
        })

        return res.status(200).json({
            messsage : "Message sent",
            data : newMessage
        })
    }catch (error){
        return res.status(500).json({message:"Something went wrong", error})
    }
}   

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
