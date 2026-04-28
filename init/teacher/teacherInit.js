let teacherData = require("./teacher");
const Teacher = require("../../models/teacher");
const mongoDbConnect = require("../../mongoDbConnect");
mongoDbConnect();
const init = async()=>{
    await Teacher.deleteMany({});
    await Teacher.insertMany(teacherData);
}
init().then(()=>{
    console.log("Teacher db init successful")
}).catch(err=>{
    console.log("error in initializing Teacher db: "+err);
})