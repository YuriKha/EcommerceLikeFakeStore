
// יש לשים לב שהמודל שלנו יהיה באותם השמות כמו בבסיס הנתונים שלנו כולל טיפוס הנתונים של השדות
const mongoose=require('mongoose');
mongoose.pluralize(null); // מבטל את ההתערבות של ספריית מונגוס בשמות הקבצים שלי
const UserSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Uid:Number,
    FirstName:String, // FirstName:{type:String,require:true}  יש אפשרות להגדיר אילוצים לשדות 
    LastName:String,  
    Phone:String,
    Email:String,
    Adress:String,
    Pass:String
});

//----------------------ייצא----------------------------
// שם של האוסף ,הטבלה, בבסיס הנתונים והסכימה של המסמכים הכלולים בו 
module.exports=mongoose.model("users",UserSchema); // יש לשים לב שהאוסף באותו שם

