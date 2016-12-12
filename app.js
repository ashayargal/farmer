var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , bodyParser = require('body-parser')
  , multer = require('multer')
  , path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var main = require('./routes/main');
var mysql= require('./routes/mysql');
var session =require('express-session');
var mongoSessionConnectURL = "mongodb://localhost:27017/amazon";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");

var app = express();
mysql.createConnectionPool();

// all environments
app.set('port', process.env.PORT || 9200);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(expressSession({
	secret: 'amazon',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Landing Page
app.get('/',function(req,res){
	ejs.renderFile('./views/amazonLanding.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});

//Farmer modules
app.get('/farmerSignUp',function(req,res){
	ejs.renderFile('./views/farmerSignUp.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.get('/farmerLogin',function(req,res){
	ejs.renderFile('./views/farmerLogin.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.get("/farmerEditProfileForm",function(req,res){
	var json_response ={"farmerEditProfileFormStatus" : 200};
	console.log("sending"+json_response.farmerEditProfileFormStatus);
	res.send(json_response);
});
app.get('/pendingProfile',function(req,res){
	ejs.renderFile('./views/pendingProfile.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/farmerSignUp',main.doFarmerSignUp);
app.post('/farmerLogin',main.doFarmerLogin);
app.get('/farmerProfile',main.displayFarmerProfile);
app.post("/editFarmerInfo",main.editFarmerInfo);
app.post('/deleteFarmer',main.deleteFarmer);


//Customer modules
app.get('/customerSignUp',function(req,res){
	ejs.renderFile('./views/customerSignUp.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.get('/customerLogin',function(req,res){
	ejs.renderFile('./views/customerLogin.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/customerSignUp',main.doCustomerSignUp);
app.post('/customerLogin',main.doCustomerLogin);
app.get('/customerProfile',main.displayCustomerProfile);
app.get('/deleteCustomer',main.deleteCustomer);
app.post('/addCart',main.addCart);
app.post('/checkoutconfirm',main.confirmcheckout);
app.post('/orderhistroy',main.orderhistroy);
app.post('/cancelorder',main.cancelorder);
app.post('/checkout',function(req,res) {
	var json_responses = {"checkoutStatus" : 200};
	res.send(json_responses);
});
app.get('/viewFinalBill',main.viewBill);

//Product Modules
app.get('/displayAddProductForm',function(req,res) {
	var json_response = {"displayAddProductFormStatus":200};
	res.send(json_response);
});
app.post('/addProduct',main.addProduct);
app.post('/deleteProductDetails',main.deleteProduct);
app.get('/displayUpdateProductForm',function(req,res) {
	var json_response = {"displayUpdateProductFormStatus":200};
	res.send(json_response);
});
app.post('/updateProduct',main.updateProduct);
app.post('/searchProduct',main.searchProduct);
app.post('/productDetails',main.viewIndividualProducts);
app.get('/displayProductDetails',main.displayProductInfo);
app.post('/addProductReview',main.addProductReview);
// Billing Modules



//Admin Modules
app.get('/adminLogin',function(req,res){
	ejs.renderFile('./views/adminLogin.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.get('/revenuestats',function(req,res){
	ejs.renderFile('./views/revenuestats.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/billsearch',main.billsearch);
app.post('/truckstatus',main.truckstatus);
app.post('/modifytruckstatus',main.modifytruckstatus);
app.post('/adminLogin',main.doAdminLogin);
app.get('/adminProfile',main.displayAdminProfile);
app.get('/farmerRequestList',main.displayFarmerRequestsList);
app.post('/approveFarmer',main.approveFarmer);
app.get('/customerRequestList',main.customerRequestList);
app.post('/approveCustomer',main.approveCustomer);
app.get('/productRequestList',main.productRequestList);
app.post('/approveProduct',main.approveProduct);
app.get('/displayFarmerList',main.displayFarmerList);
app.get('/displayCustomerList',main.displayCustomerList);
app.get('/displayProductList',main.displayProductList);
app.get('/reviewProduct',function(req,res) {
	ejs.renderFile('./views/reviewProductDetails.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/getReviewProduct',main.getReviewProduct);
app.get('/reviewCustomer',function(req,res) {
	ejs.renderFile('./views/reviewCustomerDetails.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		}
		else {
			res.end('An error occurred');
			console.log(err);
		}
	});
});
app.post('/getReviewCustomer',main.getReviewCustomer);
app.post("/tripmap",main.tripmap);
app.get("/tripmaps",main.tripmaps);
app.post('/stattripcust',main.stattripcust);
app.post('/stattripdri',main.stattripdri);
app.post('/stattriparea',main.stattriparea);
app.get('/listtrips',main.listtrips);
app.get('/listalltrips',main.listalltrips);
app.get('/statspercustomer',main.statspercustomer);
app.get('/custstat',main.cutstats);
//app.get('/dristat',main.dristat);
app.get('/statsperdriver',main.statsperdriver);
app.get('/dristat',main.dristats);
app.get('/statsperarea',main.statsperarea);
app.get('/areastat',main.areastat);
app.get('/allareastat',main.allareastat);
app.post('/revenuestat',main.revenuestat);
app.get('/revenuestat',main.revenuestats);
app.post('/api/photo', multer({ dest: './uploads/'}).single('upl'), main.upload);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
