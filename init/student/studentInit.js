let studentData = require("./student");
const Student  = require("../../models/student");
const mongoDbConnect  = require("../../mongoDbConnect")
mongoDbConnect();
const bcrypt = require("bcrypt");
const init = async()=>{
    await Student.deleteMany({});
    let hashedPass = await bcrypt.hash("yashika", 10);
    studentData =  studentData.map(data=>{
        return {...data, teacher: "69f1ff4408d733b19888bab8", password: hashedPass};
    })
    await Student.insertMany(studentData);
}
init().then(()=>{
    console.log("student data init successful !");
}).catch(err=>{
    console.log("error in initializing student data: "+err);
})
