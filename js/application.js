$(document).ready(function() {
	
	// ------------------------------------------------- Post Review Animation
	
	function postReviewAnimate() {
		
		$('#review-input').val('');
		$('#title').val('');
		$('#author').val('');
		
		$('#input-panel').hide(1000, function() {
			$('#input-panel').show(1000);	
		});
		
	}
	
	// ------------------------------------------------- Sign Up Request
	
	$('#sign-up-form').submit(function(event) {
		
		event.preventDefault();
		
		var usernameInput = $('#username').val();
		var emailInput = $('#email').val();
		var passwordInput = $('#password').val();
		
		signUp(usernameInput, emailInput, passwordInput, signIn);

	});
	
	// ------------------------------------------------- Sign In Request
	
	$('#sign-in-form').submit(function(event) {
		
		event.preventDefault();
		
		var usernameInput = $('#signin-username').val();
		var passwordInput = $('#signin-password').val();
		
		signIn(usernameInput, passwordInput);
		
	});
	
	// ------------------------------------------------- Search Reviews
	
	$('#review-search').on('keyup', function() {
		
		var searchInput = $('#review-search').val();
		
		if(!searchInput) {
			$('#allf-reviews').html('');
			listAll();
		}
		
		searchReviews(searchInput);
		
	});
	
	// ------------------------------------------------- Post a Review
	
	$('#new-review').on('click', function() {

		var reviewInput = $('#review-input').val();
		var bookTitle = $('#title').val();
		var bookAuthor = $('#author').val();
		var rating = $('#rating').val();
		
		postReviewAnimate();
		
		postReview(reviewInput, bookTitle, bookAuthor, rating, listAll);

	});
	
	// ------------------------------------------------- Sign Out
	
	$('#signout').on('click', function() {
		
		signOut();
		
	});
	
	
	// ------------------------------------------------- Characters Remaining Function
									 
	$('#review-input').on('keyup', function() {
		
		var currentCharacters = $(this).val().length;
		var remainingCharacters = 140 - currentCharacters;
		$('#characters-remaining').text(remainingCharacters);
		
	});
	
	
	// ------------------------------------------------- Home Page Link
	
	$('.navbar-brand').on('click', function() {
		
		location.reload();
		
	});
	
	// ------------------------------------------------- Favourite Button
	
	$(document).on('click', '.star-div', function() {

		var favouriteTitle = $(this).parent().find('.title').html();
		var favouriteAuthor = $(this).parent().find('.author').html();
		var book = { title: favouriteTitle, author: favouriteAuthor };
		
		console.log(book);
		
		addToFavourites(book, listUsersFavouriteBooks);
		
	});

});