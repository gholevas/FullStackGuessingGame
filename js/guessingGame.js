
$(document).ready(function(){



var winNum = generateWinningNumber();
console.log(winNum);
var guesses = 5;
var guessed = [];
$('#confetti').css('visibility','hidden');
 // **** Guessing Game Functions **** 

function generateWinningNumber(){
	return Math.floor(Math.random() * 101);
}


function playersGuessSubmission(guess){
	if(isNaN(guess) || guess > 100){
		var obj = $('#magicMessage').text("Choose a number\n between 0-100");
		obj.html(obj.html().replace(/\n/g,'<br/>'));
	}else if(guessed.indexOf(guess) !== -1){
		$('#magicMessage').text("You guessed that already.");
	}else{

		if(guesses === 1){
			if(guess === winNum){
				playerWon();
			}else{
				playerLost();
			}
		}else{
			guesses--;
			guessed.push(guess);
			$('#guessed').text("You guessed: " +guessed );
			checkGuess(guess);
			$('#guess').val('');
			$('#guessesLeft').text('You have ' + guesses + ' guesses left.');
		}
	}
}


function lowerOrHigher(guess){
	if(guess > winNum){
		if(guess - winNum < 5){
			return 'Guess lower.\nYou are hot.';
		}else if(guess - winNum < 20){
			return 'Guess lower.\nYou are warm.';
		}else{
			return 'Guess lower.\nYou are cold.';
		}
	}else{
		if(winNum - guess < 5){
			return 'Guess higher.\nYou are hot.';
		}else if(winNum - guess < 20){
			return 'Guess higher.\nYou are warm.';
		}else{
			return 'Guess higher.\nYou are cold.';
		}
	}
}


function checkGuess(guess){
	if(guess === winNum){
		playerWon();
	}else{
		guessMessage(guess);
	}
}

function playerWon(){
	$('#guess').css('visibility','hidden');
	$('button').text('Play Again?');
	$('#magicMessage').text("That's it.");
	$('.cover-heading').text("You won!");
	$('#confetti').css('visibility','visible');
	$('#guess').css('visibility','hidden');
	$('button').text('Play Again?');
}

function playerLost(){
	$('#guess').css('visibility','hidden');
	$('button').text('Play Again?');
	$('#magicMessage').text("The number was " + winNum);
	$('.cover-heading').text("You lost.");
	$('#guess').val('');
	$('#guessesLeft').css('visibility','hidden');
}

function provideHint(){
	$('#magicMessage').text("The number was " + winNum);
	$('.cover-heading').text("Come on, dont cheat.");
	$('#guess').css('visibility','hidden');
	$('button').text('Play Again?');
}

function guessMessage(guess){
	var obj = $('#magicMessage').text(lowerOrHigher(guess));
	obj.html(obj.html().replace(/\n/g,'<br/>'));
}


function playAgain(){
	guesses = 5;
	guessed = [];
	winNum = generateWinningNumber();
	$('#guess').val('');
	$('#guess').css('visibility','visible');
	$('#guessed').css('visibility','hidden');
	$('#guessesLeft').css('visibility','visible');
	$('#guessesLeft').text('You have 5 guesses left');
	$('#magicMessage').text('');
	$('.cover-heading').text("Guess a number.");
	$('#guess').css('visibility','visible');
	$('#guessed').text('.');
	$('#guessed').css('visibility','visible');
	$('button').text('Ask the Magic Ball');
	$('#confetti').css('visibility','hidden');
}


/* **** Event Listeners/Handlers ****  */
$('button').on("click",function(){
	if($('button').text() === "Play Again?"){
		playAgain();
	}else{
		playersGuessSubmission(parseInt($('#guess').val()));
	}
})

$('#guess').keypress(function (e) {
  if (e.which == 13) {
	playersGuessSubmission(parseInt($('#guess').val()));
    return false;  
  }
});

$('#playAgain').on("click",function(){
	playAgain();
})

$('#getHint').on("click",function(){
	provideHint();
})


});
