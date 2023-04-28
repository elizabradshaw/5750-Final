const bcrypt = require('bcryptjs');
const User = require('../models/UserMongoose');

exports.getAdmin = async (req, res, next) => {
  try {
    const users = await User.find();
    res.render('admin', { pageTitle: 'Admin', users });
  } catch (err) {
    console.log(err);
  }
};

exports.updateAdmin = async (req, res, next) => {
  const usersData = req.body.users;
  try {
    for (const userData of usersData) {
      await User.findByIdAndUpdate(userData.id, { admin: !!userData.admin });
    }
    res.redirect('/users/admin');
  } catch (err) {
    console.log(err);
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.admin) {
    next();
  } else {
    res.redirect('/unauthorized');
  }
};

exports.getRegister = (req, res) => {
  res.render("users/register", { pageTitle: "Register", messages: req.flash('error') });
};

exports.getLogin = (req, res) => {
  res.render("users/login", { pageTitle: "Login", messages: req.flash('error') });
};

exports.postRegister = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        console.log("user already exists!")
        return res.redirect("/users/register");
      }
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      return user.save()
        .then((result) => {
          res.redirect("/users/login");
        });
    })

    .catch((err) => {
      console.log(err);
    });
};

exports.findUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // req.flash('error', 'Invalid email or password.');
        // return res.redirect('/users/login');
        next();
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          res.locals.doMatch = doMatch;
          res.locals.user = user;
          // Call the next function
          next();
        })
    })
    .catch(err => console.log(err));
}

exports.processLogin = (req, res, next) => {
  let doMatch = res.locals.doMatch;
  let user = res.locals.user;

  if (doMatch && user) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save(err => {
      console.log(err);
      if (!err) {
        req.flash('success', `Welcome, ${user.firstName}!`)
      }
      res.redirect('/');
    });
  }
  req.flash('error', 'Invalid email or password.');
  res.redirect('/users/login');
}

exports.saveFavoriteStyle = async (req, res, next) => {
  try {
    const styleId = req.params.styleId;
    const userId = req.session.user._id;

    const user = await User.findById(userId);
    if (!user.favoriteStyles.includes(styleId)) {
      user.favoriteStyles.push(styleId);
      await user.save();
    }

    res.redirect('/users/favorite-styles');
  } catch (err) {
    console.log(err);
  }
};

exports.getFavoriteStyles = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate('favoriteStyles');
    res.render('users/favorite-styles', { pageTitle: 'Favorite Styles', styles: user.favoriteStyles });
  } catch (err) {
    console.log(err);
  }
};

//is this placed correctly

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
