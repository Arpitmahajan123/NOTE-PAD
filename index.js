const express = require('express');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        // console.log(files);
        res.render('index.ejs', {files : files});
    })
})

app.get("/files/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata) {
        // console.log(filedata);
        res.render('show.ejs', {filename : req.params.filename, filedata : filedata});

    })
})

// For Handeling Form
app.post("/create", (req, res) => {
    // For Testing Data Aaraha Hai Ki Nahi
    // console.log(req.body) 
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.Details, (err) => {
        res.redirect("/");
    });
})

app.get("/edit/:filename", (req, res) => {
    res.render("edit.ejs", {filename : req.params.filename});

})

app.post("/edit", (req, res) => {
    // console.log(req.body);
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){
        res.redirect("/"); 
    });

})

app.listen(8000);