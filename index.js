
/** @type {HTMLFormElement} */
const catPicker = document.getElementById("categorySelect");
const categorySelectorButtons = catPicker.elements;
const feedDiv = document.getElementById("Feed");


const questions = JSON.parse(localStorage.getItem("QuestionDatabase"));
if(!questions)
{
    location.href="editTrivia.html";
}

DisplayCategoryPicker();



//changes function associated with the submit event (when pressing button by default in form) to getQuestions function
catPicker.addEventListener("submit",(e)=>{
    e.preventDefault();
    DisplayQuestions();
})

//checks if a radio button is selected and matches it to a category in the question database, updating the current questions to those questions
function DisplayQuestions(){
    let c ='';
    let index ='';
    //get selected category button
    for (let i = 0; i < categorySelectorButtons.length-1/*button is one of the elements */; i++) {
        if(categorySelectorButtons[i].checked)
        {
            c =categorySelectorButtons[i].value;
        }
    }
    //if no category is selected return and error
    if(c==''){
        //Make the feed have nothing in it
        console.log("No category selected");
        return;
    }
    //Gets index of category in database matching the radio button category
    for (let i = 0; i < questions.length; i++) {
        const categoryOfQuestions = questions[i].category;
        if(c== categoryOfQuestions)
        {
            index=i;
            break;
        }
    }
    feedDiv.innerHTML="";
    //randomize question positions in array
    for(let i=0;i<questions[index].questions.length;i++)
    {
        let j= Math.floor(Math.random() *(i+1));
        let temp = questions[index].questions[i];
        questions[index].questions[i]=questions[index].questions[j];
        questions[index].questions[j]=temp;
    }
    //takes each questions
    for (let i = 0; i < questions[index].questions.length; i++) {
        const question = questions[index].questions[i];
        feedDiv.innerHTML+=`
            <form class="question" id="question${i}">
                <p>${question.question}</p>
                <div class="answerBox">
                    <label for="choice1">${question.answer1}</label>
                    <input type="radio" value="${question.answer1}" name="question${i}">
                    <label for="choice2">${question.answer2}</label>
                    <input type="radio" value="${question.answer2}" name="question${i}">
                    <label for="choice3">${question.answer3}</label>
                    <input type="radio" value="${question.answer3}" name="question${i}">
                    <label for="choice4">${question.answer4}</label>
                    <input type="radio" value="${question.answer4}" id="choice4" name="question${i}">
                </div>
                <button type="button" onclick="CheckAnswer(${index},${i}, ${i})">Submit</button>
                <div id="question${i}Feedback"></div>
            </form>`;
            //make it so that you can have unlimited answer choices or as little as possible
            //could have been better if you jumbled answers here instead of when creating the question,
            //that way the answer could be in a new spot everytime and you would have one less field in the question object
            //just the correct answer and 3 wrong answers instead of storing the position of each question
    }
}

//create category selector by checking categories in questions
function DisplayCategoryPicker(){
    catPicker.innerHTML+=`<p style="font-weight:bold; display:inline";>Categories: </p>`
    for (let i = 0; i < questions.length; i++) {
        const categoryOfQuestions = questions[i];
        const category =categoryOfQuestions.category;
        catPicker.innerHTML += `<input type="radio" value="${category}" name="catPicker">${category}`
    }
    catPicker.innerHTML +=" <button>Change Category</button>"
    catPicker.innerHTML +=`<button type="button" onclick="location.href='editTrivia.html';">Edit Trivia</button>`
}
//takes the space of the question in the multi-dimensional array and checks it with the answers the user submit
function CheckAnswer(categoryIndex, questionIndex)
{
    const answer = questions[categoryIndex].questions[questionIndex].answer;
    //question will be in same position on form as in array because we scramble array before putting it on form
    const questionDiv =document.getElementById("question" + questionIndex);
    const formControls = questionDiv.elements;
    let userAnswer="";
    for (let i = 0; i < formControls.length-1/*button is one of the elements */; i++) {
        if(formControls[i].checked)
        {
            userAnswer =formControls[i].value;
        }
    }
    if(userAnswer =="")
    {
        console.log("user has not chosen answer");
        return;
    }
    const feedbackDiv = document.getElementById("question" + questionIndex + "Feedback");
    feedbackDiv.innerHTML="";
    if(userAnswer==answer)
    {
        goodEmojiIndex = Math.floor(Math.random() * emojisDatabase.goodEmojis.length);
        feedbackDiv.innerHTML+=`<p style="justify-text:center;">${emojisDatabase.goodEmojis[goodEmojiIndex]}</p>`
    }
    else{
        badEmojiIndex = Math.floor(Math.random() * emojisDatabase.badEmojis.length);
        feedbackDiv.innerHTML+=`<p style="justify-text:center;">${emojisDatabase.badEmojis[badEmojiIndex]}</p>`
    }
    
}