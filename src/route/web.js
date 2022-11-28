import express from "express";
import homeController from "../controllers/homeController"
import adminController from "../controllers/adminController"
import authentication from "../auth/authentication"
import authadmin from "../auth/authadmin"
let router = express.Router();

//
const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



let initWebRoutes = (app) => {
    
    // Định nghĩa tất cả đường link .
    // Cơ chế: khi người dùng ấn vào 1 đường link thì express sẽ vào file này tìm đường link, nếu giống thì sẽ đi tiếp vào Controller

    router.get('/',homeController.getHomePage);
    
    // Admin
    router.get('/login', homeController.getLogin);

    router.get('/admin',authentication.handleAuthentication, authadmin.authAdmin, adminController.getAdminPage);

    router.get('/admin-create-user',authentication.handleAuthentication, authadmin.authAdmin,adminController.getAdminCreateUser);

    router.post('/admin-post-user', adminController.postAdminCreateUser);

    router.get('/customer',authentication.handleAuthentication, authadmin.authAdmin,adminController.getCustomers);

    router.get('/customer-detail',authentication.handleAuthentication, authadmin.authAdmin,adminController.getCustomerDetail);

    router.post('/update-customer-infor', authentication.handleAuthentication,adminController.updateCustomerInfor);

    router.post('/delete-customer', authentication.handleAuthentication,adminController.deleteCustomer);

    router.get('/product',authentication.handleAuthentication, authadmin.authAdmin,adminController.getProduct);

    router.post('/create-product',upload.single('image'), adminController.createProduct);

    router.get('/product-detail',authentication.handleAuthentication, authadmin.authAdmin,adminController.getProductDetail);

    router.post('/update-product', authentication.handleAuthentication,adminController.updateProduct);

    router.post('/delete-product', authentication.handleAuthentication,adminController.deleteProduct);

    router.get('/order',authentication.handleAuthentication, authadmin.authAdmin,adminController.getOrders);

    router.post('/create-order-admin', authentication.handleAuthentication,adminController.createOrder);

    router.get('/delete-order', authentication.handleAuthentication,authadmin.authAdmin,adminController.deleteOrder);

    router.get('/update-order', authentication.handleAuthentication,authadmin.authAdmin,adminController.updateOrder);

    router.post('/update-order', authentication.handleAuthentication,adminController.updateOrderStatus);

    router.get('/delete-order-in-customer', authentication.handleAuthentication,adminController.deleteOrderInCustomer);

    router.get('/log-out', adminController.getLogOut);
    

    

    // Home Page
    router.post('/login', adminController.handleLogin);

    router.post('/sign-up', homeController.handleSignUp);

    router.get('/sign-up', homeController.getSignUp);

    router.get('/order-detail', authentication.handleAuthentication, homeController.getCustomerHomePage);

    router.post('/update-customer-infor-home', authentication.handleAuthentication,homeController.updateCustomerInfor);

    router.get('/delete-order-in-customer-home', authentication.handleAuthentication,homeController.deleteOrderInCustomer);

    router.get('/products', authentication.handleAuthentication, homeController.getProduct);

    router.post('/buy-product', homeController.createOrder);
  



    return app.use("/", router);
}


module.exports = initWebRoutes;