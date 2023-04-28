exports.getHome = (req, res, next) => {
  res.render("index", { pageTitle: "Home", path: req.path });
};

exports.getAbout = (req, res, next) => {
  res.render("about", { pageTitle: "About", path: req.path });
};

exports.getUnauthorized = (req, res) => {
  res.render("unauthorized", { pageTitle: "Unauthorized Access" });
};

exports.getExternalApi = (req, res) => {
  res.render('external-api', { pageTitle: 'External API - Random Kitten', path: req.path });
};
