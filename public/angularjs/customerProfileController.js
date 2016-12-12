
amazon.controller('customerProfileController', function($scope, $http) {	
	$scope.rating=3;
	$scope.productQuantity=1;
	$scope.addProductToCart = function(productId,productName,productPrice,farmerId) {
		$http({
			method : "POST",
			url : '/addCart',
			data : {
				"productId" : productId,
				"productName" : productName,
				"productPrice":productPrice,
				"farmerId" : farmerId,
				"productQuantity":$scope.productQuantity
			}
		}).success(function(data) {
			if(data.addCartStatus == 200){
			window.location.assign('/customerProfile');
			}
		}).error(function(error) {
		});
	};

	$scope.checkout = function(productId,productName,productPrice,farmerId) {
		$http({
			method : "POST",
			url : '/checkout',
			data : {
			}
		}).success(function(data) {
			if(data.checkoutStatus === 200)
				window.location.assign('/viewFinalBill');
		}).error(function(error) {
		});
	};

	$scope.displayIndividualProduct = function(productId,productName,productPrice,productQuantity,productDescription,productCategory,productAvgRatings,farmerId){ 
		alert("clicked");
		$http({
			method : "POST",
			url : '/productDetails',
			data : {
				"productId" : productId,
				"productName" : productName,
				"productPrice":productPrice,
				"productQuantity":productQuantity,
				"productDescription":productDescription,
				"productCategory":productCategory,
				"productAvgRatings":productAvgRatings,
				"farmerId" : farmerId,
			
			}
		}).success(function(data){
			if(data.viewIndividualProductsStatus === 200) {
				window.location.assign('/displayProductDetails');
			}
		}).error(function(error) {
		});
	};

	$scope.submitReview = function(productId,farmerId) {
		$http({
			method : "POST",
			url : '/addProductReview',
			data : {
				"reviewComments" : $scope.reviewComments,
				"productId":productId,
				"farmerId":farmerId,
				"rating":$scope.rating
			}
		}).success(function(data) {
			if(data.reviewPostStatus === "PostedReview"){
				window.location.assign("/customerProfile");
			}else
				window.location.assign("/");
		}).error();
	};
});


