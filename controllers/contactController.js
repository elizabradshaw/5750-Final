const ContactRequestMongoose = require('../models/ContactRequestMongoose');

exports.getContact = (req, res, next) => {
  res.render('contact', { pageTitle: 'Contact', path: '/contacts/new' });
};

exports.getContactList = async (req, res, next) => {
  try {
    const contacts = await ContactRequestMongoose.find({ response: null });
    res.render('contact-list', {
      pageTitle: 'Contact List',
      contacts,
      path: '/contacts',
    });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, message, phone, address } = req.body;
    await ContactRequestMongoose.create({
      name,
      email,
      message,
      phone,
      address,
    });
    res.render('thanks', { pageTitle: 'Thank You!', path: '/contacts/new' });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.getEditContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await ContactRequestMongoose.findById(id);
    res.render('contact-respond', {
      pageTitle: `${contact.name} - edit`,
      contact,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log('error: ', e);
  }
};

exports.editContact = async (req, res, next) => {
  const { id } = req.params;
  const { response } = req.body;
  try {
    const contact = await ContactRequestMongoose.findByIdAndUpdate(id, {
      response,
      dateResponded: new Date(),
    });
    res.render('contact-respond', {
      pageTitle: `${contact.name} - edit`,
      contact,
      path: req.baseUrl,
    });
  } catch (e) {
    console.log('error: ', e);
  }
};
