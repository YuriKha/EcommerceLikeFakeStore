// ---- כאן נממש את הפונקיות של מוצרים ----

// חיבור לקובץ מוצרים אשר נמצאה בתקיית מודל
const product=require('../models/product'); // המשתנה 'מוצר' שיצרתי פה ילווה אותנו בקובץ זה
const mongoose=require('mongoose'); // קישור לספריה שיודעת לטפל בבסיס הנתונים שלי

// נייצא את כל הפונקציות על מנת שנוכל להשתמש בהם בתיקיית ראוטר
module.exports={
    //-------------- כל המוצרים ---------------
    GetProduct:(req,res)=>{
        product.find().then((prod)=>{ // כל האוסף של מוצרים
            // אני מחזיר את כל המוצרים
            return res.status(200).json({Msg:"this is all the product: " ,prod});   
        });                
    },
    //-------------- קבלת מוצר לפי ID ---------
    GetProductById:(req,res)=>{
        product.find({Pid:req.params.pid}).then((prod)=>{ // מחפש בבסיס נתונים שלי לפי האיידי שהתקבל
           if(prod.length>0)
           {
                // מחזיר את המוצר שאתה מחפש
                return res.status(200).json({Msg:"the product that you looking for " ,prod});
           } 
           else
           {
                // במידה ולא מוצא מוצר עם האיידי שביקשתה 
                return res.status(406).json({Msg:"no product with that ID " ,pid:req.params.pid}); 
           }           
        });  
    },
    //-------------- מחיקת מוצר ---------------
    DeleteProduct:(req,res)=>{        
        product.find({Pid:req.params.pid}).then((prod)=>{ // קודם נבדוק האם קיים לי איידי כזה בבסיס נתונים שלי
            if(prod.length>0) // במידה ואכן נמצאה לי מוצר כזה תתבצעה מחיקה  
            {
                // כאן תתבצעה המחיקה של המוצר שנמצאה
                product.deleteOne({Pid:req.params.pid}).then(()=>{
                    // שולח הודעה שהמוצר נמחק עם פרטי המוצר
                    return res.status(200).json({Msg:"Product was deleted", prod});                                
                });   
            }
            else 
            {
                // שולח הודעה שלא קיים מוצר אם האיידי הזה שאתה מנסה למחוק
                return res.status(406).json({Msg:"no product with that ID ",pid:req.params.pid});
            }
        })
    },
    //----------- הוספת מוצר חדש -------------
    AddProduct:(req,res)=>{                
        const{Pid,Pname,Price,Pdiscription,Picname}=req.body;
        product.find({Pid:Pid}).then((prod)=>{ // קודם נבדוק האם כבר קיים לי איידי כזה בבסיס נתונים שלי
            if(prod.length>0) //   במידה ואכן נמצאה לי מוצר כזה הוא יודעה שהאיידי תפוס
            {
                // מחזיר הודעה שכבר קיים איידי כזה
                return res.status(406).json({Msg:"this ID is in use " +Pid});
            }
            else // אחרת ישמור את כל הנתונים
            {
                const Prod=new product({
                    _id:new mongoose.Types.ObjectId(),
                    Pid:Pid,
                    Pname:Pname,
                    Pdiscription:Pdiscription,
                    Picname:Picname,
                    Price:Price                                         
                });
                Prod.save().then(()=>{ // כאן מתבצעת השמירה 
                    // מחזיר אישור רישום מוצר אם הפרטים שלו
                    return  res.status(200).json({msg:'you add new product with id '+Pid, Prod });
                }).catch((error)=>{ 
                    // במידה והתרחשה שגיאה ברישום הרשומה החדשה מחזיר שגיאה עם פרטים
                    return res.status(500).json({error}); 
                }); 
            }
        })
    },
    //----------עודכון מוצר קיים -------------
    UpdateProduct:(req,res)=>{
        product.find({Pid:req.params.pid}).then((rows)=>{ // קודם נבדוק האם= קיים לי איידי כזה בבסיס נתונים שלי
            if(rows.length>0) //   במידה ואכן נמצאה לי מוצר כזה
            {
                // פה נבצע את העידכון
                product.updateOne({Pid:req.params.pid},req.body).then((prod)=>{
                    return res.status(200).json({Msg:"you update product with ID" ,Pid:req.params.pid});        
               });
            }
            else // אחרת אין לי מוצר כזה לעדכן
            {
                // מחזיר הודעה שאין מוצר עם האיידי הזה
                return res.status(406).json({Msg:"no product with that ID" ,Pid:req.params.pid});               
            }
        })        
    },
}

