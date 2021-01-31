//jshint esvaersion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-puneet:uiuiui@cluster0.6ejfg.mongodb.net/blogDB", {useNewUrlParser:true, useUnifiedTopology:true});

const homeStartingContent = "Hey! This is my very first blog website.";
const aboutContent = "Hello, I'm Puneet Sharma. Developer of this beutifull blog website";
const contactContent = "You can contact me anytime, if you have my number 😂";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){
  Post.find({}, function(err, posts){
    res.render("Home", {homestartingcontent: homeStartingContent, posts:posts});
  });
});

app.get("/about", function(req, res){
  res.render("About", {aboutcontent:aboutContent,});
});

app.get("/contact", function(req, res){
  res.render("Contact", {contactcontent:contactContent});
});

app.get("/compose", function(req, res){
  res.render("Compose");
});

app.post("/compose", function(req, res){

  const post = new Post({
    title : req.body.postTitle,
    body : req.body.postBody
  });
  post.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){
  var requestedId = req.params.postId;
  Post.findOne({_id: requestedId}, function(err, post){
    res.render("post", {title:post.title, body:post.body});
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
  console.log("Server running on Port 3000");
});
