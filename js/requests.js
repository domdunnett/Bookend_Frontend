
// ------------------------------------------------- Ajax Request template

function Request() {

	this.type = '';
	this.url = 'http://localhost:8000';
	this.data = {};
	this.xhrFields = { withCredentials: true };
	this.dataType = 'json';
	this.success = function(response) {
	};

}

// ------------------------------------------------- List all reviews

function listAll() {

	var allreviewsRequest = new Request();
	allreviewsRequest.type = 'GET';
	allreviewsRequest.url += '/reviews';
	allreviewsRequest.success = function(response) {
		for(var i = 0; i < response.length; i++) {
			var text= '';
			text += '<li>' + response[i].tweet + '</li>';
			text += '<li class="tweet-user"><em>' + response[i].user + '</em></li>';

			$('#all-reviews').append(text);
		}
	};
	allreviewsRequest.error = function(response) {
		$('#all-reviews').append('<li>' + response.responseText + '</li>');
	};


	$.ajax(allreviewsRequest);

}

// ------------------------------------------------- Get all user reviews

function getUserReviews(username) {

	var userTweetRequest = new Request();

	userTweetRequest.type = 'GET';
	userTweetRequest.url += '/users/'+ username +'/reviews';
	userTweetRequest.success = function(response) {

		if(response.length) {
			$('#user-reviews').html('');
			for(var i = 0; i < response.length; i++) {
				var text= '';
				text += '<li>' + response[i].tweet + '</li>';
				$('#user-reviews').append(text);
			}
		}
		else {
			$('#user-reviews').html('');
			$('#user-reviews').append("No reviews found.");
		}
	}

	console.log(userTweetRequest);

	$.ajax(userTweetRequest);

}


// ------------------------------------------------- Sign In

function signIn(usernameInput, passwordInput) {

	var signInRequest = new Request();
	var dataPackage = {
		user: {
			username: usernameInput,
			password: passwordInput
		}
	};

	signInRequest.type = 'POST';
	signInRequest.url += '/sessions';
	signInRequest.data = dataPackage;
	signInRequest.success = function(response) {

		console.log(response);
		getUserreviews(usernameInput);

	};
	signInRequest.error = function(response) {

		console.log(response);

	};


	$.ajax(signInRequest);

}


// ------------------------------------------------- Sign Up

function signUp(usernameInput, emailInput, passwordInput) {

	var signUpRequest = new Request();
	var dataPackage = {
		user: {
			username: usernameInput,
			email: emailInput,
			password: passwordInput
		}
	};

	signUpRequest.type = 'POST';
	signUpRequest.url += '/users';
	signUpRequest.data = dataPackage;
	signUpRequest.success = function(response) {

		signIn(usernameInput, passwordInput);

		window.location.href = 'http://127.0.0.1:56359/profile_page.html';

	}

	signUpRequest.error = function(response) {
		console.log(response);
	};

	$.ajax(signUpRequest);

}

// ------------------------------------------------- Search Request

function searchReviews(searchInput) {

	var searchRequest = new Request();
	searchRequest.type = 'GET';
	searchRequest.url += '/reviews/search/' + searchInput;
	searchRequest.success = function(response) {
		console.log(response);

//		if(response.length) {
//			$('#all-reviews').html('');
//			for(var i = 0; i < response.length; i++) {
//				var text= '';
//				text += '<li>' + response[i].tweet + '</li>';
//				text += '<li class="tweet-user"><em>' + response[i].user + '</em></li>';
//
//				$('#all-reviews').append(text);
//
//			}
//		}
//		else {
//			$('#all-reviews').html('');
//			$('#all-reviews').append("No reviews found.");
//		}
	}
	console.log(searchRequest);

	$.ajax(searchRequest);

}

// ------------------------------------------------- Post a Review

function postReview(reviewInput) {

	var newReviewRequest = new Request();
	var dataPackage = {
		review: {
			message: reviewInput,
			// more data needed
		}
	};

	newReviewRequest.type = 'POST';
	newReviewRequest.url += '/reviews';
	newReviewRequest.data = dataPackage;
	newReviewRequest.success = function(response) {
		console.log(dataPackage);
		console.log(response);
	};


	$.ajax(newReviewRequest);

}

// ------------------------------------------------- Sign Out

function signOut() {

	var signOutRequest = new Request();
	signOutRequest.type = 'DELETE';
	signOutRequest.url = '/sessions';
	signOutRequest.success = function(response) {
		console.log(response);
	};

	$.ajax(signOutRequest);

}