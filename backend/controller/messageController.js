import Message from '../models/messageModle'
import Chat from '../models/chatModel'

export const message = async(req, res) =>{
    try{
        const {chatId, sender, text} = req.body

        if(!chatId || !sender || !text){
            res.status(400).json({message : "All feilds are required"})
        }

        const message = await message.create({
            chatId,
            sender,
            message
        })

        return res.status(200).json({
            messsage : "Message sent",
            data : message
        })
    }catch (error){
        res.status(500).json({message:"Something went wrong", error})
    }
}