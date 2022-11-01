//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".add-new-task__input");//Add a new task.
var addButton=document.querySelector(".add-new-task__btn");//first button
var incompleteTaskHolder=document.querySelector(".tasks__list_incomplete");//ul of #incompleteTasks
var completedTasksHolder=document.querySelector(".tasks__list_completed");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    label.innerText=taskString;
    label.className='tasks__label ';

    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className="tasks__input_checkbox";
    editInput.type="text";
    editInput.className="tasks__input_text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.className="edit-task-btn btn";


    deleteButton.className="delete-task-btn btn";
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.className="delete-task-img";

    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.classList.add("tasks__item")
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.tasks__input_text');
    var label=listItem.querySelector(".tasks__label");
    var editBtn=listItem.querySelector(".edit-task-btn");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .editmode
    if(containsClass){
        //switch to .editmode
        //label becomes the inputs value.
        editInput.classList.add ("tasks__input_edit")
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        // label.classList="label label_edit"
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("edit-mode");
    editInput.classList.toggle("tasks__input_edit");
    label.classList.toggle("tasks__label_edit");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    var listItemLabel = listItem.querySelector(".tasks__label");
    console.log(listItem,listItemLabel, "Complete Task...");
    completedTasksHolder.appendChild(listItem);
    listItemLabel.classList.add("tasks__label_completed");
    bindTaskEvents(listItem, taskIncomplete);

}

var taskIncomplete=function(){

//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    var listItemLabel = listItem.querySelector(".tasks__label_completed");
    console.log(listItem, "Incomplete Task...");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
    listItemLabel.classList.remove("tasks__label_completed");
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector("input[type=checkbox]");
    var editButton=taskListItem.querySelector(".edit-task-btn");
    var deleteButton=taskListItem.querySelector(".delete-task-btn");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.