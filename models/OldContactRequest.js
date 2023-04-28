const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const slugify = require("slugify");

const ContactRequest = sequelize.define("contactRequest", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmail: true,
  },
  phone: {
    type: Sequelize.STRING,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  datePosted: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  dateResponded: {
    type: Sequelize.DATE,
  },
  response: {
    type: Sequelize.STRING,
  },
  shortMessage: {
    type: Sequelize.DataTypes.VIRTUAL,
    get() {
      return `${this.message.split(/\s+/).slice(0, 10).join(" ")}...`;
    },
    set(value) {
      throw new Error("Do not try to set the 'shortMessage' value", value);
    },
  },
});

module.exports = ContactRequest;
