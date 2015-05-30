
// ------------------------------------------------- Ajax Request template

function Request() {

	this.type = '';
	this.url = 'https://bookend-api.herokuapp.com';
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
		
		$('#all-reviews').html('');
		
		for(var i = 0; i < response.length; i++) {
			var text= '';
			text += '<li class="list-group-item">';
			text +=		'<div class="container-fluid">';
			text +=			'<div class="col-xs-10">';
			text +=				'<h4><strong class="title">' + response[i]["book-title"] + '</strong> by <strong class="author">' + response[i]["book-author"] + '</strong></h4>';
			text +=				'<p>' + response[i].message + '</p>';
			text +=				'<p>Review by <em>\/' + response[i].username + '</em></p>';
			text +=				'<div>' + numberOfStars(response[i].rating) + '</div>';
			text +=			'</div>';
			text +=			'<div class="col-xs-2 star-div">';
			text +=				'<div id=' + response[i]._id + '><span class="glyphicon glyphicon-star-empty favourite-star"></span></div>';
			text +=			'</div>';
			text +=		'</div>';
			text +=	'</li>';

			$('#all-reviews').append(text);
		}
	};
	allreviewsRequest.error = function(response) {
		$('#all-reviews').append('<li class="list-group-item">' + response + '</li>');
	};
	
	$.ajax(allreviewsRequest);

}

// ------------------------------------------------- List user favourite reviews

function listUsersFavouriteBooks() {
	
	var favouritesRequest = new Request();
	favouritesRequest.type = 'GET';
	favouritesRequest.url += '/user';
	favouritesRequest.success = function(response) {
		
		var text= '';
		
		console.log(response);
		
		$.each(response, function(index, book) {
			
			$('#favourite-books').html('');

			if(book) {
				text += '<li class="list-group-item">';
				text +=		'<h4><strong class="title">' + book.title + '</strong> by '
				text +=		'<strong class="author">' + book.author + '</strong></h4>';
				text +=	'</li>';
			}
			
		});
		
		console.log(text);
	
		if(text === undefined) {
			$('#favourite-books').html('');
		} 
		else {
			$('#favourite-books').append(text);
		}
		
	};
	favouritesRequest.error = function(response) {
		$('#favourite-books').append('<li class="list-group-item">' + response + '</li>');
	};
	
	$.ajax(favouritesRequest);
	
}


// ------------------------------------------------- Return Text to add Star Rating

function numberOfStars(rating) {
	
	var ratingString = '';
	
	for(var i = 0; i < rating; i++) {
		
		ratingString += '<span class="glyphicon glyphicon-star review-star"></span>'
		
	}
	
	return ratingString;
	
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
	console.log(dataPackage);
	signInRequest.success = function(response) {

		console.log(response);
		
		if (response.authenticated == true) {
      window.location = '/profile_page.html';
    }
      

	};
	signInRequest.error = function(response) {

		console.log(response);
		
	};


	$.ajax(signInRequest);

}


// ------------------------------------------------- Sign Up

function signUp(usernameInput, emailInput, passwordInput, callback) {

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

		callback(usernameInput, passwordInput);

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
		
		$('#all-reviews').html('');
		
		for(var i = 0; i < response.length; i++) {
			var text= '';
			text += '<li class="list-group-item">';
			text +=		'<div class="container-fluid">';
			text +=			'<div class="col-xs-10">';
			text +=				'<h4><strong class="title">' + response[i]["book-title"] + '</strong> by <strong class="author">' + response[i]["book-author"] + '</strong></h4>';
			text +=				'<p>' + response[i].message + '</p>';
			text +=				'<p>Review by <em>\/' + response[i].username + '</em></p>';
			text +=				'<div>' + numberOfStars(response[i].rating) + '</div>';
			text +=			'</div>';
			text +=			'<div class="col-xs-2 star-div">';
			text +=				'<div id=' + response[i]._id + '><span class="glyphicon glyphicon-star-empty favourite-star"></span></div>';
			text +=			'</div>';
			text +=		'</div>';
			text +=	'</li>';

			$('#all-reviews').append(text);
			
		}
		
		console.log(response);
	}

	$.ajax(searchRequest);

}

// ------------------------------------------------- Post a Review

function postReview(reviewInput, bookTitle, bookAuthor, userRating, callback) {

	var newReviewRequest = new Request();
	var dataPackage = {
		review: {
			message: reviewInput,
			'book-title': bookTitle,
			'book-author': bookAuthor,
			rating: userRating
		}
	};

	newReviewRequest.type = 'POST';
	newReviewRequest.url += '/reviews';
	newReviewRequest.data = dataPackage;
	newReviewRequest.success = function(response) {
		console.log(dataPackage);
		console.log(response);
		callback();
	};


	$.ajax(newReviewRequest);

}

// ------------------------------------------------- Sign Out

function signOut() {

	var signOutRequest = new Request();
	signOutRequest.type = 'DELETE';
	signOutRequest.url += '/sessions';
	signOutRequest.success = function(response) {
		console.log(response);
		window.location = '/index.html';
	};
	signOutRequest.error = function(response) {
		console.log(response);
	};
	
	console.log(signOutRequest);

	$.ajax(signOutRequest);

}

// ------------------------------------------------- Update user favourites

function addToFavourites(book, callback) {
	
	var userRequest = new Request();
	userRequest.type = 'PUT';
	userRequest.url += '/users/edit';
	userRequest.data = { book: book };
	userRequest.success = function(response) {
		console.log(response);
		callback();
	}
	
	console.log(userRequest);
	
	$.ajax(userRequest);
	
}
