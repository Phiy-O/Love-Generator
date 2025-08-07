const resultDisplay = document.getElementById('result-display');
const yourName = document.getElementById('yourname-input');
const crushName = document.getElementById('crushname-input');
const status = document.getElementById('status')

function generate(){
    let randomPercent = Math.floor(Math.random() * 100);
    
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
        resultDisplay.innerText = "Your love percentage is " + randomPercent + "%"
    }
}