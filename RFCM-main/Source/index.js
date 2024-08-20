const express=require("express");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app=express();
const{spawn}=require("child_process");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        return cb(null,`${file.originalname}`);
    },
});

const upload=multer({storage})

app.set("views engine","ejs");
app.set("views",path.resolve("./views")); // serve your HTML file from the 'public' directory
app.use(express.urlencoded({extended:false}));



app.get("/upload",(req,res)=>{
    const folderPath = './uploads/'; // Replace with the path to your folder
   
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    const filePath = `${folderPath}${file}`;
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`Deleted ${filePath}`);
    });
  }
});
const folderPath2 = '../InputFile/'; // Replace with the path to your folder

fs.readdir(folderPath2, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    const filePath = `${folderPath2}${file}`;
    fs.unlink(filePath, (err) => {
      if (err) throw err;
      console.log(`Deleted ${filePath}`);
    });
  }
});
    res.render("index.ejs");
});

app.post("/upload",upload.single("data"),(req,res)=>{
    //console.log(req.body);
   // console.log(req.file);
    let sex=req.body.sex;
   
    return res.redirect(`/process-data/${sex}`);
});



app.get('/process-data/:sex', async (req, res) => {
    let {sex}=req.params;
   
    try {
        let code = await myFacn();
        if (code === 0) {
            
            let code2=await myFacn2(sex);
            if(code2===0){
                res.download(`../Output/${sex}_Res.csv`,(err)=>{
                    if(err){
                        console.error("Error downloading file:", err);
                        res.status(500).send("Error downloading file");
                    }
                });
            }
        } else {
            res.send("successful");
        }
    } catch (error) {
        res.status(500).send("Error processing data");
    }
  });


  app.post("/text",(req,res)=>{
    const array = req.body.PID;
    const dataArray = array.split(' ');
    const sex=req.body.sex;
    console.log(sex);
      // Join the array elements with a newline character
      const data = dataArray.join('\n');
  
      // Write the data to a file
      fs.writeFileSync('./uploads/PID_List.txt', data);
    res.redirect(`/process-data/${sex}`);
  })




app.listen(4000,()=>{
    console.log("App is running posrt 4000");
})

async function myFacn() {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['PID-Fasta.py']);
  
        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
  
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
  
        pythonProcess.on('exit', (code) => {
            console.log(`Python process exited with code ${code}`);
            resolve(code);  // Resolve the promise with the exit code
        });
  
        pythonProcess.on('error', (err) => {
            console.error(`Failed to start subprocess: ${err}`);
            reject(err);  // Reject the promise if there's an error
        });
    });
  }

async function myFacn2(sex) {
    console.log(sex);
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['RFCM_PALM.py','results1.fasta',sex]);
  
        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
  
        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
  
        pythonProcess.on('exit', (code) => {
            console.log(`Python process exited with code ${code}`);
            resolve(code);  // Resolve the promise with the exit code
        });
  
        pythonProcess.on('error', (err) => {
            console.error(`Failed to start subprocess: ${err}`);
            reject(err);  // Reject the promise if there's an error
        });
    });
  }
