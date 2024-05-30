const questionElement = document.querySelector(".question")
const quiz = document.querySelector(".quiz")
const welcome = document.querySelector(".welcome")
const answerButtons = document.querySelector(".answer-buttons")
const nextButton = document.querySelector(".next")
const subjects = document.querySelector(".quiz-subjects")
const index = document.querySelector(".index")
const home = document.querySelector(".home")
const app = document.querySelector(".app")
   
let data = ""
let subject = 0
let questionIndex = 0;
let score = 0;

(function () {
    fetch('./quiz.json')
    .then(res => res.json())
    .then(output => {
        data = output

    })
})()



Array.from(subjects.children).map(subject => {
        subject.addEventListener('click', (e)=> {
            if(!user_name.value) {
      swal({
        title: "Unable to enter Quiznosaur🦖",
        text: "Please enter your name 🥺",
        icon: "error",
        timer: 2000,
        button: false
      });
      
                return
            }
        welcome.style.display = "none"
        quiz.style.display = "block"
        index.style.color = "white" 
        app.style.paddingTop = "10px"
        swal({
            title: `Welcome to Quiznosaur ${user_name.value} 🦖`,
            text: "We know you're gonna ace this🎉 ",
            icon: "success",
            timer: 2000,
            button: false
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
function shuffle(array) {
    let cIndex = array.length
    while (cIndex > 0) {
        let rIndex = Math.floor(Math.random() * cIndex)
        cIndex --;
        [array[cIndex], array[rIndex]] = [array[rIndex], array[cIndex]] 
    }
}
function startQuiz (id)  {
    subject = id
    questionIndex = 0;
    score = 0;
    home.style.display = "none"
    nextButton.innerHTML = "Next"
    shuffle(data[subject])
    console.log(data[subject])
    showQuestion()
}

const showQuestion = () => {
    if (subject !== undefined) {
    let questionNo =  questionIndex + 1
    let currentQuestion = data[subject][questionIndex]
    answerButtons.innerHTML = ""
    index.innerHTML = `Question ${questionNo}/${data[subject].length}`
    questionElement.innerHTML = currentQuestion.question
    shuffle(currentQuestion.options)
    currentQuestion.options.map(option => {
        var newOption = document.createElement("button")
        newOption.innerHTML = `${option.option} `
        newOption.classList.add("btn")
        newOption.classList.add("animate__animated", "animate__zoomInDown")
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
            swal({
                title: `Thank you for using Quiznosaur ${user_name.value} 🦖`,
                text: "We hope you had a blast 🤩 ",
                icon: "success",
                timer: 2000,
                button: false
              });
          
        },1000)
    }
}


