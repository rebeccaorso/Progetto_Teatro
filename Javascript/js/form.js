const BTNSUBMIT = document.querySelector('#btnSubmit');
const logged = document.querySelector('#logged');
const emailCliente = document.querySelector('#emailCliente');
const codiceCliente = document.querySelector('#codiceCliente');
const ricordaPass = document.querySelector('#ricordaPass');
const form = document.querySelector('#form');

let connUtente = false;

document.addEventListener('DOMContentLoaded', checkLoginStatus);

BTNSUBMIT.addEventListener('click', login);

function login(event){
    fetch('http://localhost:9007/api/cliente')
    .then(data => {
        return data.json();
    })
    .then(clienti => {
            console.log(clienti);
            const email = emailCliente.value;
            const codice = codiceCliente.value;
            const clienteTrovato = clienti.find(cliente => cliente.email == email && cliente.cod_cliente == codice);
            if(clienteTrovato){
                console.log(clienteTrovato);
                renderTo(clienteTrovato);
            }else{
                alert("Inserire indirizzo email e codice cliente validi");
                form.reset();
            }
        });
        }

function logOut() {
    logged.classList.remove('logOn');
    form.classList.remove('hiddenForm');
    localStorage.removeItem('cliente');
}

function renderTo(cliente) {
    form.classList.add('hiddenForm')
    logged.classList.add('logOn');
    logged.innerHTML = `<h3>Bentornato, ${cliente.nome}.</h3> <br>
    <h4>Il tuo indirizzo email: ${cliente.email}</h4>
    <button onclick="logOut()">Log out</button>`;
    if(ricordaPass.checked == true){
        localStorage.setItem('cliente', JSON.stringify(cliente));
    }
    
}

function checkLoginStatus() {
    const cliente = JSON.parse(localStorage.getItem('cliente'));
    if (cliente) {
        renderTo(cliente);
    }
}