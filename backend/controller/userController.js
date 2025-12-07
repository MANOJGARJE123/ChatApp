import User from '../models/userModel'

export const getMe = async (req, res) =>{
    try{
        const user = await User.findById(req.user.id).select('-password')

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        res.status(200).json(user)
    }catch (error){
        res.status(500).json({message: error.message});
    }
}
export const getAllUsers = async(req, res) =>{
    try{
        const users = await User.find({ _id: { $ne: req.user.id } }).select("-password");

        res.status(200).json(users)
    }catch(error){
        res.status(500).json({ message: "No user are there" });
    }
}
export const getUserById = async(req, res) =>{
    try{
        const {id} = req.params

        const user = await User.findById(user).select('-password')

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user);
    }catch(error){
        return res.status(500).json({message : "something went wrong"})
    }
}

export const searchUser = async(req, res) =>{
    try{
        const {query} = req.query
        const users = await User.find({
            name :{$regex: query, $options: "i"}
        }).select("-password")

        res.status(200).json(users)
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}