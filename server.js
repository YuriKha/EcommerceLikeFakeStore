//כאן מוקם שרת האינטרנט

const http = require('http'); // חיבור לספרייה
const app=require('./app'); //   ייבוא של קובץ אפ ,יש לייצא קובץ אפ בתוך אפ על מנת שנוכל לייבא

const server=http.createServer(app);
const port=3000; // המשתנה פורט יכיל מספר הפורט
server.listen(port,()=>{ // אומר לשרת להתחיל להאזין לפורט
    console.log('you started the server') // ולהדפיס שהשרת התחיל
}); 