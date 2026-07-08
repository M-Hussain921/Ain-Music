const MAX = 999999;
const MIN = 100000;

export const generateOtp=()=>{
    return Math.floor(MIN + Math.random() * (MAX - MIN + 1));
};

export const  sendOTP=async(req,res)=>{
    const {phoneNumber}=req.body;
    if(!phoneNumber) return res.status(404).json({message:"phone number not found"}) 
}