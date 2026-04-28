let studentData = require("./student");
const Student  = require("../../models/student");
const mongoDbConnect  = require("../../mongoDbConnect")
mongoDbConnect();

const init = async()=>{
    await Student.deleteMany({});
    studentData =  studentData.map(data=>{
        return {...data, teacher: "69f09a0f42124656240efe2c", password: "yashika"};
    })
    await Student.insertMany(studentData);
}
init().then(()=>{
    console.log("student data init successful !");
}).catch(err=>{
    console.log("error in initializing student data: "+err);
})
