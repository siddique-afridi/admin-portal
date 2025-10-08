

exports.getMe = async (req,res)=>{
    try{
        if(!req.user) return res.json(401).json({message:"Not Authorized"})
            // req.user was set by authMiddleware
    res.json(req.user);
} catch (err) {
  res.status(500).json({ message: err.message });
}
};