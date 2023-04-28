const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const slugify = require("slugify");

const MustacheStyle = sequelize.define("styles", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
    set(value) {
      this.setDataValue("title", value);
      // add slug
      this.setDataValue(
        "titleSlug",
        slugify(value, { lower: true, trim: true })
      );
    },
  },
  imageURL: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: ["([^s]+(.(?i)(jpg|png))$)"],
    },
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  titleSlug: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = MustacheStyle;
