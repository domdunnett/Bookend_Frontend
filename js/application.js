$(document).ready(function() {
	
	
	// ------------------------------------------------- Sign Up Request
	
	$('#signup').on('click', function() {
		
		var usernameInput = $('#username').val();
		var emailInput = $('#email').val();
		var passwordInput = $('#password').val();
		
		signUp(usernameInput, emailInput, passwordInput);

	});
	
	// ------------------------------------------------- Sign In Request
	
	$('#signin').on('click', function() {
		
		var usernameInput = $('#signin-username').val();
		var passwordInput = $('#signin-password').val();
		
		signIn(usernameInput, passwordInput);
		
	});
	
	// ------------------------------------------------- Search Reviews
	
	$('#user-search').on('keyup', function() {
		
		var searchInput = $('#user-search').val();
		
		if(!searchInput) {
			$('#all-reviews').html('');
			listAll();
		}
		
		searchReviews(searchInput);
		
	});
	
	// ------------------------------------------------- Post a Review
	
	$('#new-review').on('click', function() {

		var reviewInput = $('#review-input').val();
		
		postReview(reviewInput);

	});
	
	// ------------------------------------------------- Sign Out
	
	$('#signout').on('click', function() {
		
		signOut();
		
	});
	
	
	// ------------------------------------------------- Characters Remaining Function
									 
	$('#tweet-input').on('keyup', function() {
		
		var currentCharacters = $(this).val().length;
		var remainingCharacters = 140 - currentCharacters;
		$('#characters-remaining').text(remainingCharacters);
		
	});
	
	
	// ------------------------------------------------- Home Page Link
	
	$('.navbar-brand').on('click', function() {
		
		location.reload();
		
	});
		
	

});