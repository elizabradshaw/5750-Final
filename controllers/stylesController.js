const MustacheStyleMongoose = require("../models/MustacheStyleMongoose");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

exports.getNewStyleForm = (req, res, next) => {
  res.render("new-style", { pageTitle: "New Style", path: req.baseUrl });
};

exports.postNewStyle = async (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(422).render("new-style", {
      pageTitle: "New Style",
      errorMessage: "Attached file is not an image",
    });
  }

  const imageURL = "images/" + image.filename;

  try {
    const newStyle = new MustacheStyleMongoose({
      title,
      description,
      imageURL,
    });
    await newStyle.save();
    res.redirect("/styles");
  } catch (e) {
    console.log("error: ", e);
  }
};

exports.getStyles = async (req, res, next) => {
  try {
    const styles = await MustacheStyleMongoose.find();
    res.render('gallery', { pageTitle: 'Gallery', styles, path: req.baseUrl });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.getSingleStyle = async (req, res, next) => {
  const { styleSlug } = req.params;
  try {
    const style = await MustacheStyleMongoose.findOne({ titleSlug: styleSlug });
    res.render('gallery-single-post', {
      pageTitle: style.title,
      style,
      path: req.baseUrl,
      isLoggedIn: req.session.isLoggedIn
    });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.upload = upload;

