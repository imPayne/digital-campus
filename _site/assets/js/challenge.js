let sound__done = document.getElementById('sound__done');
let sound__notdone = document.getElementById('sound__notdone');
let sound__blocked = document.getElementById('sound__blocked');
let sound__incomplete = document.getElementById('sound__incomplete');
let sound__inprogress = document.getElementById('sound__inprogress');

let statusList_lever = false;
let statusList = document.getElementById('status-list');
document.getElementById('status').addEventListener("click", showStatusList);

function showStatusList() {
    if (statusList_lever) {
        // console.log("Remove statusList");
        statusList.style.display = "none";
        statusList_lever = false;
    } else {
        // console.log("Show statusList");
        statusList.style.display = "flex";
        statusList_lever = true;
    }
};

let soundStatus = false;

function setStatus(status, firstTime) {
    if (!localStorage.getItem("challenge-" + page_number)) {
        // console.log("❌ Challenge {{page.number}} don't have a status");
        // localStorage.removeItem("challenge-" + "{{page.number}}", status);
        // toGreen();
        // notdone_sound.play();
        localStorage.setItem("challenge-" + page_number, "todo");
        status = "todo";
    } else if (firstTime == true){
        
    } else{
        playSound(status);
    }
    // console.log("setStatus : " + status);
    switch (status) {
        case "done":
            // console.log("Done !");
            changeStatus('Terminé', 'fa-check', status);
            // sound__done.play();
            // playSound('done');
            break;
        case "todo":
            // console.log("Todo !");
            changeStatus('À faire', 'fa-hourglass-start', status);
            // sound__notdone.play();
            // playSound('todo');
            break;
        case "inprogress":
            // console.log("In progress !");
            changeStatus('En cours', 'fa-sync-alt', status);
            // sound__inprogress.play();
            // playSound('inprogress');
            break;
        case "incomplete":
            // console.log("Incomplete !");
            changeStatus('Incomplet', 'fa-spinner', status);
            // sound__incomplete.play();
            // playSound('incomplete');
            break;
        case "blocked":
            // console.log("Blocked !");
            changeStatus('Blocage', 'fa-times-circle', status);
            // sound__blocked.play();
            // playSound('blocked');
            break;
    }
    
    setCookie(status);
}

function playSound(status){
    switch (status) {
        case "done":
            sound__done.play();
            break;
        case "todo":
            sound__notdone.play();
            break;
        case "inprogress":
            sound__inprogress.play();
            break;
        case "incomplete":
            sound__incomplete.play();
            break;
        case "blocked":
            sound__blocked.play();
            break;
    }
}

let previous_icon;
let previous_status;

function changeStatus(title, icon, status) {
    // console.log("changeStatus : " + status);
    document.getElementById('status-label').innerHTML = title;
    document.getElementById('status').classList.add(status);

    document.getElementById('status-' + status).classList.add('hidden');
    

    if (previous_status){
        document.getElementById('status-' + previous_status).classList.remove('hidden');
        // console.log("remove previous_status : " + previous_status);
        document.getElementById('status').classList.remove(previous_status);
    }  

    if (icon){
        document.getElementById('status-icon').classList.add(icon);
    }    
    
    if (previous_icon){
        document.getElementById('status-icon').classList.remove(previous_icon);
    }           
    
    previous_icon = icon;
    previous_status = status;
}

function setCookie(status) {
    if (!localStorage.getItem("challenge-" + page_number)) {
        // console.log("❌ [setCookie] Challenge {{page.number}} don't have a status");
        // localStorage.removeItem("challenge-" + "{{page.number}}", status);
        // toGreen();
        // notdone_sound.play();
        localStorage.setItem("challenge-" + page_number, "todo");

    } else {
        // console.log("✅ Challenge {{page.number}} is now done !");
        // console.log("setCookie : " + status);
        localStorage.setItem("challenge-" + page_number, status);
        // toRed();
        // done_sound.play();
    }
}

// console.log("Get LS item from challenge-{{page.number}}");
setStatus(localStorage.getItem("challenge-" + page_number), true);
// console.log("Status from LS : " + localStorage.getItem("challenge-{{page.number}}"));