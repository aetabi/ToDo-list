const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");



const app = express();

const items = ["Buy food", "Cook food", "Eat food"];
const workItems = [];

//ejs need a folder called views and List.ejs file inside of "views"
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({extended: true}));
//To activate CSS on website, creating public and transfer css file into "public".
app.use(express.static("public"));

app.get("/", function(req, res) {

//access to date.js
const day = date.getDate();

  res.render("list", {listTitle: day, newListItems: items});
});

// post on work list
app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
      items.push(item);
      res.redirect("/");
  }

});

//access to work page
app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

//access to about page
app.get("/about", function(req, res){
  res.render("about");
});

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
