//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "Hello! This is my Soccer Blog. In an effort to learn how to persistenly store information on websites, I put this web app together (half way through Udemy.com's web development course) using Node.JS for the backend, Express.JS to help with the server / routing, Bootstrap for the styling, EJS for the handy use of partials & Mongoose to interface with a Mongo DB database.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//creating a new DB on our machine called blogDB & connecting to it
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

// Every post must have a title and content.
const postSchema = {
  title: String,
  content: String
};

// Every individual post will follow the schema and 
const Post = mongoose.model("Post", postSchema);


app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });

});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  // creating a new post after you click save
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  // Only save if there are no errors to report.
  post.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});