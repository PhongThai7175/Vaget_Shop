
import db from '../models/index';
import homeServices from '../services/homeServices'
import adminServices from '../services/adminServices'


let getHomePage = async (req, res) => {

  let product = await adminServices.getAllProduct();
  if (req.signedCookies.userId) {
    let user = await adminServices.getCustomerDetail(req.signedCookies.userId);
    console.log(user);
    return res.render("homepage/homepage.ejs", {
      product: product,
      user: user,
    });
  } else {
    return res.render("homepage/homepage.ejs", { product: product, user: "" });
  }
};


let getSignUp = (req, res) => {
  return res.render("homepage/register.ejs", { error: "" });
};

let getLogin = (req, res) => {
  return res.render("homepage/login.ejs", { error: "", user: "" });
};

let handleSignUp = async (req, res) => {
  let message = await homeServices.handleSignUp(req.body);
  console.log(message);
  if (message === "Ok") {
    return res.redirect("/login");
  } else {
    return res.render("homepage/register.ejs", { error: "This email has existed ! Please choose another" });;
  }
};

let getCustomerHomePage = async (req, res) => {
  let customer = await adminServices.getCustomerDetail(req.query.id);
  let order = await adminServices.getOrderByCustomerId(req.query.id);
  return res.render("homepage/customerHomePage.ejs", {
    order: order,
    customer: customer,
  });
};

let updateCustomerInfor = async (req, res) => {
  let customer = await adminServices.updateCustomerInfor(req.body);
  let product = await adminServices.getAllProduct();
  let order = await adminServices.getOrderByCustomerId(req.body.id);
  return res.render("homepage/customerHomePage.ejs", {
    customer: customer,
    product: product,
    order: order,
  });
};

let deleteOrderInCustomer = async (req, res) => {
  let message = await adminServices.deleteOrder(req.query.id);
  let cusId = req.query.cusId;

  if (message === "Ok") {
    return res.redirect("/order-detail?id=" + cusId);
  }
};

let getProduct = async (req, res) => {
  let message = await adminServices.getProductById(req.query.id);

  console.log(message);

  return res.render("homepage/products", { product: message });
};

let createOrder = async (req, res) => {
  let user = req.body.id;
  let message = await adminServices.createOrder(req.body);
  if (message === "Ok") {
    return res.render('homepage/success' ,{ user : user});
  }
};
module.exports = {
  getHomePage: getHomePage,
  getLogin: getLogin,
  handleSignUp: handleSignUp,
  getSignUp: getSignUp,
  getCustomerHomePage: getCustomerHomePage,
  updateCustomerInfor: updateCustomerInfor,
  deleteOrderInCustomer: deleteOrderInCustomer,
  getProduct: getProduct,
  createOrder: createOrder,
};
