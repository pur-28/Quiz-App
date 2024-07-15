let questions = [
    {
        numb: 1,
        question: "What is the name of Harry Potter's pet owl?",
        answer: "Hedwig",
        options: [
            "Hedwig",
            "Crookshanks",
            "Scabbers",
            "Fawkes"
        ]
    },
    {
        numb: 2,
        question: "Who is the author of the Harry Potter series?",
        answer: "J.K. Rowling",
        options: [
            "Stephen King",
            "J.R.R. Tolkien",
            "George R.R. Martin",
            "J.K. Rowling"
        ]
    },
    {
        numb: 3,
        question: "What house at Hogwarts does Harry belong to?",
        answer: "Gryffindor",
        options: [
            "Slytherin",
            "Ravenclaw",
            "Gryffindor",
            "Hufflepuff"
        ]
    },
    {
        numb: 4,
        question: "What is the name of the Weasley's house?",
        answer: "The Burrow",
        options: [
            "12 Grimmauld Place",
            "The Burrow",
            "Shell Cottage",
            "Godric's Hollow"
        ]
    },
    {
        numb: 5,
        question: "Who is the headmaster of Hogwarts when Harry first arrives?",
        answer: "Albus Dumbledore",
        options: [
            "Severus Snape",
            "Minerva McGonagall",
            "Albus Dumbledore",
            "Rubeus Hagrid"
        ]
    },
    {
        numb: 6,
        question: "What spell is used to disarm an opponent?",
        answer: "Expelliarmus",
        options: [
            "Lumos",
            "Expelliarmus",
            "Alohomora",
            "Expecto Patronum"
        ]
    },
    {
        numb: 7,
        question: "What position does Harry play on his Quidditch team?",
        answer: "Seeker",
        options: [
            "Keeper",
            "Chaser",
            "Beater",
            "Seeker"
        ]
    },
    {
        numb: 8,
        question: "What is the name of the mirror that shows a person's deepest desire?",
        answer: "Mirror of Erised",
        options: [
            "Mirror of Erised",
            "Mirror of Desire",
            "Mirror of Reflections",
            "Mirror of Secrets"
        ]
    },
    {
        numb: 9,
        question: "Who kills Dumbledore?",
        answer: "Severus Snape",
        options: [
            "Severus Snape",
            "Bellatrix Lestrange",
            "Lord Voldemort",
            "Draco Malfoy"
        ]
    },
    {
        numb: 10,
        question: "What magical creature pulls the carriages that take students from the Hogwarts Express to the castle?",
        answer: "Thestrals",
        options: [
            "Thestrals",
            "Hippogriffs",
            "Dragons",
            "Unicorns"
        ]
    }

];

// Selecting required elements
const startBtn = document.querySelector('.startbtn');
const infoBox = document.querySelector('.infobox');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = infoBox.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quizbox');
const resultBox = document.querySelector('.resultbox');
const optionList = document.querySelector('.optionlist');
const timeLine = document.querySelector('header .timeline');
const timeText = document.querySelector('header .timelefttxt');
const timeCount = document.querySelector('.timer .timersec');

// creating new div tags for icons
let tikeIconTag = '<div class="icon tick"><i class="bx bx-check-circle"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="bx bx-check-circle"></i></div>';


// When Start Quiz button is clicked show info box
startBtn.onclick = () => {
    infoBox.classList.add('activeInfo');
}

// If exit button is clicked hide info box
exitBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');
}

//If continue button clicked
continueBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');
    quizBox.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let timeValue = 15;
let que_count = 0;
let que_numb =1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = resultBox.querySelector('.buttons .restart');
const quit_quiz = resultBox.querySelector('.buttons .quit');

// If restart button is click
restart_quiz.onclick = () => {
    quizBox.classList.add('activeQuiz');
    resultBox.classList.remove('activeResult');
    timeValue=15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = " Time Left"
    nextBtn.classList.remove('show');
    
}

//if quit button clicked
quit_quiz.onclick = () => {
    window.location.reload();
}
const nextBtn = document.querySelector('footer .nextbtn');
const botton_ques_counter = document.querySelector('footer .totalque');

//if next que clicked
nextBtn.onclick = () => {
    if (que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = " Time Left";
        nextBtn.classList.remove('show');
    }else{
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

// Getting questions and options frpm array

function showQuestions(index){
    const que_text = document.querySelector('.quetxt');

    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    que_text.innerHTML = que_tag;
    optionList.innerHTML = option_tag;

    const option = optionList.querySelectorAll('.option');

    //set onclick attribute to all available options
    for(i = 0; i <option.length; i++){
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const allOptions = optionList.children.length;

    if(userAns == correctAns){
        userScore +=1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML("beforeend", tikeIconTag);
    }else{
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML("beforeend", crossIconTag);

        for(i=0; i < allOptions; i++){
            if (optionList.children[i].textContent == correctAns){
                optionList.children[i].setAttribute('class', "option correct");
                optionList.children[i].insertAdjacentHTML("beforeend", tikeIconTag);
            }
        }
    }

    for(i=0; i < allOptions; i++){
        optionList.children[i].classList.add("disabled")
    }
    nextBtn.classList.add('show')
}

function showResult(){
    infoBox.classList.remove('activeInfo');
    quizBox.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');
    const scoreText = resultBox.querySelector(".scoretext");

    if(userScore === 10){
        let scoreTag = '<span>and congrats!!! <i class="bx bx-happy-heart-eyes"></i> You got <p> '+ userScore +'</p>out of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if(userScore > 7){
        let scoreTag = '<span>and Nicee... <i class="bx bx-cool"></i> You got <p> '+ userScore +'</p>out of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>But Sorry... <i class="bx bx-meh-alt"></i> You got only <p> '+ userScore +'</p>out of <p>'+questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
            timeText.textContent = 'Time Out';
            const allOptions = optionList.children.length;
            let correctAns = questions[que_count].answer;
            for(i = 0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAns){
                    optionList.children[i].setAttribute('class', "option correct");
                    optionList.children[i].insertAdjacentHTML("beforeend", tikeIconTag);
                }
            }

            for(i = 0; i < allOptions; i++){
                optionList.children.classList.add('disabled');
            }
            nextBtn.classList.add('show')
        }
    }
}

function startTimerLine(time){
    const maxTime = 15; // Maximum time in seconds, adjust as needed
    const increment = 549 / maxTime; // Calculate increment per second

    counterLine = setInterval(timer, 1000); // Adjust interval to 1000ms (1 second)
    function timer(){
        time++;
        timeLine.style.width = time * increment + "px"; // Update width based on time and increment

        if(time >= maxTime){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    let totalQueCountTag = '<span><p>' +index+ '</p> of <p>' + questions.length+ '</p> Questions</span>';
    botton_ques_counter.innerHTML = totalQueCountTag;
}