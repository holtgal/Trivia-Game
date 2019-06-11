$(document).ready(function () {
 

  var correctAnswers = 0;
  var incorrectAnswers = 0;
  var unansweredQuestions = 0;
  var timeRemaining = 16;
  var intervalID;
  var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
  var answered = false; //variable to stop the timer if user has clicked an answer
  var correct;
  var triviaGame = [{
      question: "What does STS9 stand for?",
      answer: ["Sound Tribe Sector Nine", "Sound Time Soulstice Nine", "Safe Time Simple Nine", "Sound Tech Sector Nine"],
      correct: "0",
      image: ("assets/Images/spacehelmet.jpg")
  }, {
      question: "Where did the band originally form?",
      answer: ["Atlanta, GA", "Santa Cruz, CA", "New York", "Athens, GA"],
      correct: "3",
      image: ("assets/Images/ga-theatre.jpg")
  }, {
      question: "How many members are in the band?",
      answer: ["3", "5", "6", "4"],
      correct: "1",
      image: ("assets/Images/band5.jpg")
  }, {
      question: "How many albums has the band released?",
      answer: ["5", "9", "11", "7"],
      correct: "2",
      image: ("assets//Images/axe.jpg")
  }, {
      question: "What major artists has STS9 worked with?",
      answer: ["Jay-Z", "Snoop Dogg", "Rick Ross", "all the above"],
      correct: "3",
      image: ("assets/Images/sts9jay.jpg")
 
  }];

  // ------------- FUNCTION DECLARATIONS ----------------------------


  function startGame() {
      console.log("game has begun");
      $('.start-button').remove();
      correctAnswers = 0;
      incorrectAnswers = 0;
      unansweredQuestions = 0;
      loadQandA();
  }

  function loadQandA() {
      answered = false; // will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
      timeRemaining = 16;
      intervalID = setInterval(timer, 1000);
      if (answered === false) {
          timer();
      }
      correct = triviaGame[indexQandA].correct;
      var question = triviaGame[indexQandA].question;
      $('.question').html(question);
      for (var i = 0; i < 4; i++) {
          var answer = triviaGame[indexQandA].answer[i];
          $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
      }

      $("h4").click(function () {
          var id = $(this).attr('id');
          if (id === correct) {
              answered = true; // stops the timer
              $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
              correctAnswer();
          } else {
              answered = true; //stops the timer
              $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
              incorrectAnswer();
          }
      });
  }

  function timer() {
      if (timeRemaining === 0) {
          answered = true;
          clearInterval(intervalID);
          $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
          unAnswered();
      } else if (answered === true) {
          clearInterval(intervalID);
      } else {
          timeRemaining--;
          $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
      }
  }

  function correctAnswer() {
      correctAnswers++;
      $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
          'color': '#3D414F'
      });
      resetRound();
  }

  function incorrectAnswer() {
      incorrectAnswers++;
      $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
          'color': '#3D414F'
      });
      resetRound();

  }

  function unAnswered() {
      unansweredQuestions++;
      $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
          'color': '#3D414F'
      });
      resetRound();
  }

  function resetRound() {
      $('.answersAll').remove();
      $('.answers').append('<img class=answerImage width="150" height="150" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
      indexQandA++; // increments index which will load next question when loadQandA() is called again
      if (indexQandA < triviaGame.length) {
          setTimeout(function () {
              loadQandA();
              $('.answerImage').remove();
          }, 5000); // removes answer image from previous round
      } else {
          setTimeout(function () {
              $('.question').remove();
              $('.timeRemaining').remove();
              $('.answerImage').remove();
              $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
              $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
              $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
              setTimeout(function () {
                  location.reload();
              }, 7000);
          }, 5000);
      }
  };

  $('.startButton').on("click", function () {
      $('.startButton');
      startGame();

  });

});
