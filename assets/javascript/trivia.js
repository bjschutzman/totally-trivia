var triviaQuestions =[{
    question:"Which actor played Jules Winnfield in Quentin Tarantino's Pulp Fiction?",
    answerList: ["Bruce Willis", "Samuel L. Jackson", "John Travolta", "Uma Thurman"],
    answer: 1
},{
    question:"Which people were brought together to defear the villian Thanos?",
    answerList:["X Men", "The Goonies", "The Avengers", "Harry, Ron and Hermione"],
    answer: 2
},{
    question:"Who directed Jurrasic Park?",
    answerList:["Steven Spielberg", "RL Tolken", "James Cameron","Benicio Del Toro"],
    answer: 0
},{
  question:"Who is the One?",
  answerList:["Morpheous", "Agent Smith", "Trinity", "Neo"],
  answer: 3
},{
  question: "In what movie did a prisoner escape from prison by digging a tunnel through the walls",
  answerList:["Shawshank Redemption", "The Longest Yard", "The Green Mile", "American History X"],
  answer: 0
},{
  question:"In the movie That Thing You Do, who was the lead drummer?",
  answerList:["Lenny", "Guy", "Mr. White", "Jimmy"],
  answer: 1
},{
  question:"In the movie Shrek, who shot Shrek with an arrow?",
  answerList:["Donkey", "Lord Farquad", "The Big Bad Wolf", "Robbin Hood"],
  answer: 3
},{
  question:"What was the name of the clown in Stephen King's 'It'",
  answerList:["PennyClown", "NickleChuckle", "Pennywise", "Peterpenny"],
  answer: 2

}];   


var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8'];
var currentQuestion; 
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds; 
var time; 
var answered; 
var userSelect;
var messages = {
	correct: "Correct!",
	incorrect: "Wrong!!!!",
	endTime: "Were you not watching the time!",
	finished: "Let's see if you knew anything!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//creates a new question and answers
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking the answer stops the time and resets
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//Will see if you answer is correct or incorrect
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 6000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 6000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}


