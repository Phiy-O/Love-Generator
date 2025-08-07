const resultDisplay = document.getElementById('result-display');
const yourName = document.getElementById('yourname-input');
const crushName = document.getElementById('crushname-input');
const finalStatus = document.getElementById('status');
const modal = document.getElementById('modal');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let result = 0
let currentQuestionIndex = 0
const questions = [
    {
        question:"Do you love your crush?",
        answers:[
            {text: "absolutely", score: 15},
            {text: "OF COURSE!!", score: 20},
            {text: "not really", score: 10},
            {text: "yeaa..", score: 5},
        ]
    },
    {
        question:"How well do you understand each other's feelings?",
        answers:[
            {text: "not at all", score: 5},
            {text: "pretty well", score: 15},
            {text: "not really", score: 10},
            {text: "deeply connected", score: 20},
        ]
    },
    {
        question:"How do you feel when you see this person?",
        answers:[
            {text: "Nothing special..", score: 5},
            {text: "like most people", score: 10},
            {text: "Happy and Ecxited", score: 18},
            {text: "Butterflies and sparkle✨", score: 20},
        ]
    },
    {
        question:"How do you act when your crush is nearby?",
        answers:[
            {text: "being nonchalant", score: 1},
            {text: "Smiling non-stop", score: 20},
            {text: "Heart racing, pretending to be chill 😅", score: 18},
            {text: "Totally normal", score: 5},
        ]
    },
    {
        question:"How do you feel when you see your crush online?",
        answers:[
            {text: "Nothing special..", score: 5},
            {text: "Butterflies and sparkle✨", score: 20},
            {text: "like most people", score: 10},
            {text: "Happy and Ecxited", score: 18},
        ]
    },
]

function startQuiz(){
    currentQuestionIndex = 0
    result = 0
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)

        if (answer.score) {
            button.dataset.score = answer.score
        }
        button.addEventListener("click", selectAnswer)
    })
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const score = parseInt(selectedBtn.dataset.score);  // konversi ke number
    result += score;

    // Tampilkan tombol next kalau masih ada pertanyaan
    nextButton.style.display = 'block';

    // disable all answer buttons
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button === selectedBtn) {
            button.classList.add("selected"); // opsional: tambahkan styling kalau perlu
        }
    });

    console.log("Current score:", result, score);
}

function showResult(){
    resetState();
    questionElement.innerText = ""
    resultDisplay.innerText = "You got" + " = " + result + " points";

    if (result >= 85){
        finalStatus.innerText = "status: You are a perfect match!"
    } else if(result >= 60 && result < 85) {
        finalStatus.innerText = "status: Quite a match! Keep it going!"
    } else if(result >= 35 && result < 60) {
        finalStatus.innerText = "status: Hmm... You might need to talk more."
    } else {
        finalStatus.innerText = "status: Bro... Just friends might be better 💀"
    }
    
    nextButton.innerText = "Done";
    nextButton.style.display = "block";
    nextButton.onclick = () => {
        closeModal();
    };
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function resetState(){
    nextButton.style.display = 'none'
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function generate(){
    // let randomPercent = Math.floor(Math.random() * 100);
    
    if (yourName.value == "" && crushName.value == ""){ 
        Swal.fire({
            icon: "error",
            text: "both of your input is empty"
        });
    } else if (yourName.value == ""){ 
        Swal.fire({
            icon: "error",
            text: "fill yourname input"
        });
    } else if (crushName.value == ""){ 
        Swal.fire({
            icon: "error",
            text: "fill crushname input"
        });
    } else {
        // resultDisplay.innerText = "Your love percentage is " + randomPercent + "%"
        openModal();
        startQuiz();
    }
}

function openModal(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}
