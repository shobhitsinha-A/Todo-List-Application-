//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

//console.log(date);
const app = express();

const items = ["Buy Food","Cook Food","Eat Food"];
let workItems = [];
//place .set line below as until const app = express() app not created
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  let day = date.getDay();

  res.render("list",{listTitle: day, newListItems: items});
});

app.post("/",function(req,res){
  item = req.body.newItem;
  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work",function(req,res){

  res.render("list",{listTitle:"Work List", newListItems:workItems});
});

app.get("/about",function(req,res){
  res.render("about");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
