let QuestionDatabase=JSON.parse(localStorage.getItem("QuestionDatabase"));
let catButtons = [];

if(QuestionDatabase)
{
    loadCategories();
}
else{
    QuestionDatabase=[]
}



function loadCategories(){
    //get doc elements needed only for this function
    const catPickerForm = document.getElementById("catSelectForm");
    catPickerForm.innerHTML="";

    for (let i = 0; i < QuestionDatabase.length; i++) {
        const category = QuestionDatabase[i];

        const catButton =document.createElement("input");
        catButton.type = "radio";
        catButton.id=category.category + "button";
        catButton.name = "catChecker";
        catButton.value = category.category;
        catButtons.push(catButton);

        const catLabel = document.createElement("label");
        catLabel.htmlFor = category.category + "button";

        catPickerForm.prepend(catLabel); 
        catPickerForm.prepend(catButton);
        

        catLabel.innerHTML = category.category;
    }
}

function AddQuestion(){
    //get doc elements needed just for this function
    /** @type {HTMLFormElement} */
    const possibleAnswerInputs= document.getElementById("answerChoices").elements;
    //check selected
    let cat="";
    let answerChoices=[];
    let questionText="";

    //check if user selected category and store it
    for (let i = 0; i < catButtons.length; i++) {
        const button = catButtons[i];
        if(button.checked)
        {
            cat=button.value;
            break;
        }
    }

    //handle if the user did not select a category
    if(cat=="")
    {
        console.log("No Category selected");
        return;
    }
    //handle if the user did create a question
    questionText=document.getElementById("questionText").value;
    if(questionText=="")
    {
        console.log("Question text isn't filled out");
        return;
    }
    //check if the user created answers and store them or handle if they didn't 
    for (let i = 0; i < possibleAnswerInputs.length; i++) {
        const input = possibleAnswerInputs[i];
        if(input.value=="")
        {
            console.log("Not all answer choices are filled");
            return;
        }
        answerChoices.push(input.value);
    }
    //jumble all answers 
    for (let i = 0; i < answerChoices.length; i++) {
        let j= Math.floor(Math.random() *(i+1));
        let temp = answerChoices[i];
        answerChoices[i]=answerChoices[j];
        answerChoices[j]=temp;
    }
    //find category in database and append a question to it and clear form
    for (let i = 0; i < QuestionDatabase.length; i++) {
        const category = QuestionDatabase[i];
        if(category.category==cat)
        {
            QuestionDatabase[i].questions.push(
            {
                question:questionText,
                answer1:answerChoices[0],
                answer2:answerChoices[1],
                answer3:answerChoices[2],
                answer4:answerChoices[3],
                answer:document.getElementById("correctAnswer").value               
            })
            localStorage.setItem("QuestionDatabase", JSON.stringify(QuestionDatabase));
        }
    }
    //Clear the page so you can create more questions
    document.getElementById("questionText").value=""
    for (let i = 0; i < possibleAnswerInputs.length; i++) {
        const element = possibleAnswerInputs[i];
        element.value="";
        
    }
    for(let i=0;i<catButtons.length;i++)
    {
        catButtons[i].checked=false;
    }

}

function AddCat(){
    //get doc elements needed just for this function
    catNameInput =document.getElementById("catName");
    //check if the category name field is filled in and handle if it isn't
    if(catNameInput.value=="")
    {
        console.log("No category name is filled in");
        return;
    }
    //if the category name is verified, it will create a new category and show it on the page
    QuestionDatabase.push({
        category:catNameInput.value,
        questions:[]
    });
    loadCategories();
    localStorage.setItem("QuestionDatabase", JSON.stringify(QuestionDatabase));
}