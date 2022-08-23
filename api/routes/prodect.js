// בקובץ זה נגדיר ראוטר ונייצא אותו החוצה
const router=require('express').Router();  // יצירת אובייקט של ראוטר המכיל את ההגדרות של הניתובים

// נייבא את הפונקציות שלנו שנמצאות בקונטרולר יש לשים לב לשמות הפונקציות לא משנה הסדר
const {
    GetProduct,
    GetProductById,
    DeleteProduct,
    AddProduct,
    UpdateProduct}=require('../controller/product'); // נתיב בו נמצאות הפונקציות שלי

//-------------  ניתובים למוצרים ----------------------------
//-- יש ליזכור שאם אתה מגיע לפה אתה כבר מקבל '/product' ---
// ניתוב המחזיר את כל מוצרים 
router.get('/',GetProduct);
// ניתוב המחזיר מוצר בודד לפי האיידי בפעולת GET
router.get('/:pid',GetProductById);
// ניתוב למחיקת מוצר לפי האיידי בפעולת DELETE
router.delete('/:pid',DeleteProduct);
// ניתוב להוספת מוצר בפעולת POST
router.post('/',AddProduct);
//ניתוב לעידכון מוצר לפי האיידי בפעולת PATCH
router.patch('/:pid',UpdateProduct);
//-------------------------------------------------------

//----------------------ייצא----------------------------
module.exports=router; // לייצא החוצה
