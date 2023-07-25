const BTNDARK = document.querySelector('#btnDark');
const NAVDARK = document.querySelector('#navDark');

const ticketNumberInput = document.querySelector('#ticketNumber');

let clicked = true;

BTNDARK.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        NAVDARK.classList.remove('bg-white');
        NAVDARK.classList.add('dark-mode');
    }else{
        NAVDARK.classList.remove('dark-mode');
        NAVDARK.classList.add('bg-white');
    }
    
})

function validateNumberTicket(event){
    const ticketNumber = event.target.value;
    if(ticketNumber === ""){
        return;
    }
    if(ticketNumber < 1) {
        alert('Selezionare almeno un biglietto');
        ticketNumberInput.value = "";
    }else if(ticketNumber > 5){
        alert('Puoi acquistare massimo 5 biglietti');
        ticketNumberInput.value = 5;
    }
}

ticketNumberInput.addEventListener('change', validateNumberTicket);
ticketNumberInput.addEventListener('keyup', validateNumberTicket);

