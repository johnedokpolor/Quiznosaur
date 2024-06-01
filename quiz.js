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
let subject = ""
let questionIndex = 0;
let currentSound = ''
var audio =   new Audio ('./sounds/intro.mp3')
var winAudio =   new Audio ('./sounds/winner.mp3')
let score = 0;

(function () {
    fetch('./quiz.json')
    .then(res => res.json())
    .then(output => {
        data = output
        document.querySelector(".music").style.fontSize = "15px"
    })
})()



Array.from(subjects.children).map(subject => {
        subject.addEventListener('click', (e)=> {
            if(!user_name.value) {
    //   swal({
    //     title: "Unable to enter Quiznosaur🦖",
    //     text: "Please enter your name 🥺",
    //     icon: "error",
    //     timer: 2000,
    //     button: false
    //   });
                return
            }

        welcome.style.display = "none"
        quiz.style.display = "block"
        index.style.color = "white" 
        app.style.paddingTop = "10px"
        app.style.paddingBottom = "50px"
        // swal({
        //     title: `Welcome to Quiznosaur ${user_name.value}🦖`,
        //     text: "We know you're gonna ace this🎉 ",
        //     icon: "success",
        //     timer: 2000,
        //     button: false
        //   });
        startQuiz(e.target.id)
    })
    }
    )
home.addEventListener('click' ,()=> {
        winAudio.pause()
        winAudio.currentTime = 0
        subject = ""
        console.log(subject)
        welcome.style.display = "block"
        quiz.style.display = "none"
        document.querySelector("body").classList.remove("flex");
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
    currentSound = new Audio (data[subject][questionIndex].sound)
    let currentQuestion = data[subject][questionIndex]
    currentSound.play()
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
            new Audio ('./sounds/correct1.mp3').play()
            selectedOption.classList.add("correct")

            score ++
        }
        else {
            new Audio ('./sounds/incorrect.mp3').play()
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
        currentSound.pause()
        handleNextButton()
    }
    else {
        startQuiz(subject)
        winAudio.pause()
        winAudio.currentTime = 0
    }
 })
const handleNextButton = () => {
    questionIndex +=1
    if (questionIndex < data[subject].length) {
        showQuestion()
    }
    else {
        document.querySelector("body").classList.add("flex");
        var averageScore = data[subject].length / 2
        if (score > averageScore) {
            winAudio.play()
        }
        else {
            new Audio('./sounds/fail.mp3').play()

        }
        answerButtons.innerHTML = ""
        home.style.display = "block"
        home.style.color = "black"
        home.style.backgroundColor = "white"
        home.style.width = "50px"
        nextButton.style.display = "block"
        questionElement.innerHTML = `${user_name.value}, you scored ${score} out of ${data[subject].length}`
        nextButton.innerHTML = "Play Again"

        setTimeout(() => {
            // swal({
            //     title: `Thank you for using Quiznosaur ${user_name.value}🦖`,
            //     text: "We hope you had a blast 🤩 ",
            //     icon: "success",
            //     timer: 2000,
            //     button: false
            //   });
          
        },1000)
    }
}
function intro() {
    setInterval(() => {
        if (subject === "") {
            audio.volume = 0.5
            audio.play()
        }
        else {
        audio.volume = 0.01
        audio.play()
        }
        

    }, 1000);
    }



