let checkBoxList = document.querySelectorAll(".custom-checkbox")
let inputField = document.querySelectorAll(".input")
let errorMsg = document.querySelector(".error-msg")
let parentError = document.querySelector(".parent-error") 
let progressBar = document.querySelector(".progress-bar")
let progressValue = document.querySelector(".progress-value")
let progressLabel = document.querySelector(".goal-description")
let quoteLine = document.querySelector(".quote")

let goalQuotes = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, Keep going!",
    "Whoa, you just completed all the goals, time for chill :)"
]

let quotesLine = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, Keep going!",
    "Whoa, you just completed all the goals, time for chill :)"
]

let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first: {
        name: "",
        completed: false
    },
    second: {
        name: "",
        completed: false
    },
    third: {
        name: "",
        completed: false
    }
}

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

progressValue.style.width = `${(completedGoalsCount / 3) * 100}%`
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
progressLabel.innerText = goalQuotes[completedGoalsCount]
quoteLine.innerText = quotesLine[completedGoalsCount]

checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener("click", (event) =>{
        let allFieldsFilled = [...inputField].every(function(input){
            return input.value
        })
        if(allFieldsFilled){
            checkbox.parentElement.classList.toggle("completed")
            const inputId = checkbox.nextElementSibling.id
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
            progressValue.style.width = `${completedGoalsCount / 3 * 100}%`
            progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 Completed`
            progressLabel.innerText = goalQuotes[completedGoalsCount]
            quoteLine.innerText = quotesLine[completedGoalsCount]
            localStorage.setItem('allGoals', JSON.stringify(allGoals))
        }
        else{
            parentError.classList.add("show-error")
        }
    })
})

inputField.forEach((input) =>{
    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add("completed")
    }

    input.addEventListener("focus", () =>{
        parentError.classList.remove("show-error")
    })

    input.addEventListener("input", (e) =>{
        if(allGoals[input.id].completed){
            input.value = allGoals[input.id].name
            return
        }

        allGoals[input.id].name = input.value
        localStorage.setItem('allGoals', JSON.stringify(allGoals))
    })
})

