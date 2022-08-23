// ---- כאן נממש את הפונקיות של משתמשים ----

// חיבור לקובץ משתמשים אשר נמצאה בתקיית מודל
const user=require('../models/user'); // המשתנה 'משתמש' שיצרתי פה ילווה אותנו בקובץ זה
const mongoose=require('mongoose');  // קישור לספריה שיודעת לטפל בבסיס הנתונים שלי
const bcrypt=require('bcrypt'); // קישור לספרייה שיודעת להצפין
const jwt=require('jsonwebtoken'); // קישור לספרייה שיודע לעבוד עם תוקן


// נייצא את הפונקציות הללו ונשתמש בהם בקובץ ראוטר
module.exports={
    //------- רישום חדש של משתמש  -------
    Register:(req,res)=>{
        const {Uid,FirstName,LastName,Phone,Email,Adress,Pass}=req.body;
        // אפשר להוסיף שיחפש גם אימייל זהה במאגר אם האופרטור או
        user.find({Email:Email}).then((userfound)=>{ // נבדוק האם כבר קיים לי איידי כזה בבסיס נתונים שלי
            console.log("im here");
            if(userfound.length>0) //   במידה ואכן נמצאה לי משתמש כזה הוא ידפיס שגיאה 
            {
                // קיים משתמש עם האימייל הזה
                return res.status(406).json({Msg:"this email is in use"});
            }
            else // אחרת יצפין לי את הסיסמא וישמור את כל הנתונים
            {
                // --- הצפנה ----
                // מקבל את תוכן השדה סיסמא ובנוסף צורת הצפנה  משהוא אישי או משהוא מובנה 
                bcrypt.hash(Pass,14).then((myHashPass)=>{ // יש אפשרות להכניס מפתח פרטי או מספר על מנת שתהיה הצפנה באורך המספר
                    const users=new user({  // משתמש חדש מהמשתנה שייצרתי
                        _id:new mongoose.Types.ObjectId(),
                        Uid, // במידה ויש התאמה בין שמות השדות אפשר לרשום פעם אחת כמו בדוגמא פה
                        FirstName:FirstName, // או להמשיך ולרשום ככה
                        LastName:LastName,
                        Phone:Phone,
                        Email:Email,
                        Adress:Adress,
                        Pass:myHashPass
                    });
                    // שומרים את המשתמש החדש שייצרנו  
                    users.save().then((user)=>{   
                        // מדפיסים הודעה עם פרטי המשתמש       
                        return res.status(200).json({Msg:"New user" ,user})
                    }).catch((error)=>{
                        // במידה ונוצרה שגיאה בזמן השמירה
                        return res.status(406).json({error}); 
                    }); 
                }).catch((error)=>{
                    // במידה ונוצרה שגיאה בזמן ההצפנה
                    return res.status(406).json({error}); 
                });
            }
        });
    },
    //------- התחברות של משתמש קיים  -------
    Login:(req,res)=>{ 
        const {Email,Pass}=req.body;
        // אפשר להוסיף שיחפש גם אימייל זהה במאגר עם האופרטור או
        user.find({Email:Email}).then((userfound)=>{ // נחפש אם יש שם משתמש זה בבסיס נתונים שלי
            if(userfound.length==0) //   במידה ולא נמצאה אחד זהה נדפיס שגיאה 
            {
                return res.status(406).json({Msg:"no Email found in database " +Email+ " is wrong "});
            }
            else // אחרת תשווה את ההצפנה של הסיסמא אם מה שיש לי בבסיס נתונים 
            {
                if(userfound.length>1)
                {
                    console.log("you have more then 1 of this user name" +Email);
                }
                // --- ההשוואה של ההצפנות מה שיש לי בבסיס נתונים מול מה מה שיש לי עכשיו----
                bcrypt.compare(Pass,userfound[0].Pass).then((status)=>{ // פה נשווה את הסיסמאות
                    if(!status) // אם הסיסמא לא תואמת נחזיר שגיאה
                    {
                        // אם הגעתי לפה שם משתמש נכון אבל סיסמא לא נכונה
                        return res.status(406).json({Msg:"the password is wrong"});
                    }
                    else //  אחרת כל הנתונים תואמים לבסיס נתונים וצריך להכניס את המשתמש
                    {
                        // sign(מחרוזת ליצירת תוקן, קוד מפתח שאותו הסתרתי, וזמן תפוגה לתוקן)
                        const token=jwt.sign({Email},process.env.KEY_FOR_TOKEN,{expiresIn:'1H'})
                        return res.status(200).json({Msg:"welcome back " ,token});
                    }
                });               
            }
        });
    },
    //------- מביא את כל המשתמשים הרשומים ---
    GetAllUser:(req,res)=>{
        user.find().then((alluser)=>{ // כל האוסף של המשתמשים
            // אני מחזיר את כל המשתמשים
            return res.status(200).json({Msg:"this is all the users: " ,alluser});   
        });  
    },
    //--- מביא את המשתמש עם האיידי המבוקש ---
    GetUserById:(req,res)=>{
        user.find({Uid:req.params.pid}).then((userfound)=>{ // מחפש בבסיס נתונים שלי לפי האיידי שהתקבל
            if(userfound.length>0)
            {
                 // מחזיר את המשתמש שאתה מחפש
                 return res.status(200).json({Msg:"the user that you looking for " ,userfound});
            } 
            else
            {
                 // במידה ולא מוצא משתמש עם האיידי שביקשתה 
                 return res.status(406).json({Msg:"no user with that ID " ,Uid:req.params.pid}); 
            }           
         });  
    },
    //------ מחיקת משתמש מבסיס הנתונים-----
    DeleteUser:(req,res)=>{
        user.find({Uid:req.params.pid}).then((userfound)=>{ // בודק אם בכלל קיים כזה משתמש 
            if(userfound.length>0) // במידה וקיים
            {
                // מוחק את המתמש
                user.deleteOne({Uid:req.params.pid}).then(()=>{
                    // מוחק ושולח הודעה שהמשתמש עם האיידי הזה נמחק
                    return res.status(200).json({Msg:"user Deleted ",Uid:req.params.pid});                   
                });
            }
            else
            {
                // מודיע שלא קיים משתמש אם האיידי הזה
                return res.status(406).json({Msg:"no user found with ID ",Uid:req.params.pid});
            }            
        })
    },
    //--- עידכון פרטי משתמש בבסיס נתונים ---   
    UpdateUser:(req,res)=>{
        user.find({Uid:req.params.pid}).then((userfound)=>{ // קודם נחפש אם קיים משתמש עם האיידי המבוקש 
            if(userfound.length>0) // אם נמצאה אחד
            {               
                // פה נבצע את עידכון המשתמש
                user.updateOne({Uid:req.params.pid},req.body).then(()=>{
                    return res.status(200).json({Msg:"you update user with ID" ,Uid:req.params.pid});     
                });
            }
            else 
            {
                // לא נמצאה משתמש כזה
                return res.status(406).json({Msg:"no user with that ID" ,Uid:req.params.pid});
            }
        })
    }
}