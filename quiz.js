import data from "./quiz.json" with {type:"json"}
const questionElement = document.querySelector(".question")
const quiz = document.querySelector(".quiz")
const welcome = document.querySelector(".welcome")
const answerButtons = document.querySelector(".answer-buttons")
const nextButton = document.querySelector(".next")
const subjects = document.querySelector(".quiz-subjects")
const index = document.querySelector(".index")
const home = document.querySelector(".home")
const app = document.querySelector(".app")


let subject = 0
let questionIndex = 0;
let score = 0;

Array.from(subjects.children).map(subject => {
        subject.addEventListener('click', (e)=> {
            if(!user_name.value) {
                swal.fire({
                    icon:"error",
                    title:"Unable to enter Quiznosaur",
                    text:"Please provide your name",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar:true
                    });
                return
            }
        welcome.style.display = "none"
        quiz.style.display = "block"
        app.style.background = "white"
        swal.fire({
            icon:"success",
            title:`Welcome to Quiznosaur ${user_name.value}`,
            text:"I know you are going to ace this",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar:true
            });
        startQuiz(e.target.id)
    })
    }
    )
home.addEventListener('click' ,()=> {
        welcome.style.display = "block"
        quiz.style.display = "none"
        app.style.background = "linear-gradient(90deg, purple,  black)"

})


function startQuiz (id)  {
    subject = id
    questionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion()
}
const showQuestion = () => {
    if (subject !== undefined) {
        let currentQuestion = data[subject][questionIndex]
    let questionNo =  questionIndex + 1
    answerButtons.innerHTML = ""
    index.innerHTML = `Question ${questionNo}/${data[subject].length}`
    questionElement.innerHTML = currentQuestion.question
    currentQuestion.options.map(option => {
        var newOption = document.createElement("button")
        newOption.innerHTML = `${option.option} `
        newOption.classList.add("btn")
        newOption.dataset.correct = option.correct
        answerButtons.appendChild(newOption)
        newOption.addEventListener('click', selectAnswer)
    })
    }
    
}
const selectAnswer = (event) => {
    const selectedOption = event.target;
    const isCorrect = selectedOption.dataset.correct === "true"
        if(isCorrect) {
            selectedOption.classList.add("correct")
            score ++
        }
        else {
            selectedOption.classList.add("incorrect")
        }
        Array.from(answerButtons.children).map(option => {
            if (option.dataset.correct === "true") {
                option.classList.add('correct')
            }
            option.disabled = true
        });
    nextButton.style.display = "block"
    
}
nextButton.addEventListener('click', ()=> {
    nextButton.style.display = "none"
    if (questionIndex < data[subject].length) {
     handleNextButton()
    }
    else {
        startQuiz(subject)
    }
 })
const handleNextButton = () => {
    questionIndex +=1
    if (questionIndex < data[subject].length) {
        showQuestion()
    }
    else {
        answerButtons.innerHTML = ""
        home.style.display = "block"
        nextButton.style.display = "block"
        questionElement.innerHTML = `${user_name.value}, you scored ${score} out of ${data[subject].length}`
        nextButton.innerHTML = "Play Again"

        setTimeout(() => {
            swal.fire({
                icon:"success",
                title:`Thank you for using Quiznosaur ${user_name.value}`,
                text:"We hope you had a blast",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar:true
                });
        },1000)
    }
}
startQuiz()
