
// יש לשים לב שהמודל שלנו יהיה באותם השמות כמו בבסיס הנתונים שלנו כולל טיםוס הנתונים של השדות
const mongoose=require('mongoose');
mongoose.pluralize(null); // מבטל את ההתערבות של ספריית מונגוס בשמות הקבצים שלי
const ProductSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Pid:Number,
    Pname:String,
    Pdiscription:String,
    Picname:String,
    Price:Number
});

//----------------------ייצא----------------------------
// שם של האוסף ,הטבלה, בבסיס הנתונים והסכימה של המסמכים הכלולים בו 
module.exports=mongoose.model("products",ProductSchema); // יש לשים לב שהאוסף באותו שם