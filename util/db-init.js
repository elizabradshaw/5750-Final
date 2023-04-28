const sequelize = require("./database");

// import Models
const MustacheStyle = require("../models/MustacheStyle");
const BlogPost = require("../models/BlogPost");
const ContactRequest = require("../models/ContactRequest");

// import data
const mustacheData = require("./mustacheData.json");
const blogData = require("./blogData.json");

// sync the models
sequelize
  .sync({ force: true })
  .then(() => {
    return MustacheStyle.bulkCreate(mustacheData);
  })
  .then(() => {
    return BlogPost.bulkCreate(blogData);
  })
  .catch((e) => console.log(e));
