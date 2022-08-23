const jwt=require('jsonwebtoken'); // קישור לספריה שיודעת לעבוד עם תוקנים

// לכל שכבה יש 3 אובייקטים ,req.res.next
module.exports=(req,res,next)=>{

    try
    {
        const auth=req.headers.authorization;
        // נחלץ את התוקן
        const token=auth.split(' ')[1];
        console.log('you token is ' +token);
        jwt.verify(token,process.env.KEY_FOR_TOKEN);
            next();
    }
    catch
    {
        return res.status(409).json({Msg:"you dont have authorization"});
    }
    

}