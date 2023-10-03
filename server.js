const { clear } = require("console");
const express=require("express");

const fs=require("fs");

const path=require("path");

const server=express();
const port=3000;

const outputFolder='./output'

if(!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder);
}

server.get('/createFile',(req,res)=>{
   
    const currentTime= new Date();
    const year=currentTime.getFullYear().toString();
    const month=currentTime.getMonth().toString();
    const date=currentTime.getDate().toString();
    const hours=currentTime.getHours().toString();
    const mins=currentTime.getMinutes().toString();
    const secs=currentTime.getSeconds().toString();
    

    const fileName=`${year}-${month}-${date} ${hours}-${mins}-${secs}.txt`;
    
    //const fileName=year+"-"+month+"-"+date+"-"+hours+":"+mins+":"+secs;

    const filePath= path.join(outputFolder,fileName);

    fs.writeFile(filePath,currentTime.toISOString(),(err)=>{
        if(err){
            res.status(500).send(err);
            return;
        }

        res.send(`File create successfully ${fileName}`);
    });
});


server.get('/getFiles',(req,res)=>{
    fs.readdir(outputFolder,(err,files)=>{
        if(err){
            res.status(500).send(err);
            return;
        }

        console.log(files);
        const textFiles=files.filter((file)=>path.extname(file) === ".txt");
        res.json(textFiles);
    });
});

server.listen(port,()=>{
    console.log("Server started");
})