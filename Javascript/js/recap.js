const URL = "http://localhost:9007/api/spettacolo"
const URL3 = "http://localhost:9007/api/replica"
const URL2 = "http://localhost:9007/api/biglietto"
let demo = document.querySelector("#demo")
let btn = document.querySelector("#btnAcquista");
let demo2 = document.querySelector("#demo2");

let arrayRecuperato;

fetch(URL)
.then(data =>{return data.json()})
.then(spettacoli=>{
    console.log(spettacoli);

    fetch(URL3)
    .then(data =>{return data.json()})
      .then(repliche=>{
    console.log(repliche);

    let arraySalvato = localStorage.getItem("spettacolo");
    if (arraySalvato) {
      arrayRecuperato = JSON.parse(arraySalvato);
      console.log("array salvato "+ arrayRecuperato);
    } else {
      console.log("Nessun array trovato nel localStorage.");
    }
  
    let dataReplica = arrayRecuperato[1];
    console.log("data replica "+ dataReplica);


    let dataRep = repliche.find(replica => replica.data_replica == dataReplica);
    console.log(dataRep);
    let codiceReplica;
    if(dataRep){
       codiceReplica = dataRep.cod_replica;

      console.log("codice replica " + codiceReplica);
    }
    
  console.log(dataReplica)

  const codiceSpettacolo = arrayRecuperato[0];
  console.log(codiceSpettacolo);
  const codiceTrovato = spettacoli.filter(spettacoli => spettacoli.cod_spettacolo == codiceSpettacolo);
  console.log(codiceTrovato);  
  
  let biglietto;
 
  codiceTrovato.forEach(spettacolo =>{
    const quantitaBiglietti = arrayRecuperato[2];
    const prezzoTotale = spettacolo.prezzo * quantitaBiglietti;

    demo.innerHTML += `
    <div class="col-md-2 d-flex justify-content-center">
    <div>
      <p class="small text-muted mb-4 pb-2">Titolo</p>
      <p class="lead fw-normal mb-0">${spettacolo.titolo}</p>
    </div>
  </div>
  <div class="col-md-2 d-flex justify-content-center">
    <div>
      <p class="small text-muted mb-4 pb-2">Autore</p>
      <p class="lead fw-normal mb-0">${spettacolo.autore}</p>
    </div>
  </div>
  <div class="col-md-2 d-flex justify-content-center">
    <div>
      <p class="small text-muted mb-4 pb-2">Regista</p>
      <p class="lead fw-normal mb-0">${spettacolo.regista}</p>
    </div>
  </div>
  <div class="col-md-2 d-flex justify-content-center">
    <div>
      <p class="small text-muted mb-4 pb-2">Prezzo</p>
      <p class="lead fw-normal mb-0">${spettacolo.prezzo},00€</p>
    </div>
  </div>
  <div class="col-md-2 d-flex justify-content-center">
    <div>
      <p class="small text-muted mb-4 pb-2">Quantità</p>
      <p class="lead fw-normal mb-0">${arrayRecuperato[2]}</p>
    </div>
  </div>
  <div class="col-md-2 d-flex justify-content-center">
  <div>
    <p class="small text-muted mb-4 pb-2">Data Spettacolo</p>
    <p class="lead fw-normal mb-0">${arrayRecuperato[1]}</p>
  </div>
</div>
    `
    demo2.innerHTML += `
    <div class="float-end"  > 
                  <p class="mb-0 me-5 d-flex align-items-center">
                    <span class="small text-muted me-2">Prezzo Totale:</span> 
                    <span  class="lead fw-normal">${prezzoTotale},00€ </span>
                  </p>
             
                </div> `

  })
btn.addEventListener("click", function() {
  inviaDati();
})

function inviaDati(){
  
  let clienteSalvato = localStorage.getItem("cliente");
  let codiceCliente;
  if(clienteSalvato){
    let clienteRecuperato = JSON.parse(clienteSalvato);
    codiceCliente = clienteRecuperato.cod_cliente;
  }
  // const codUtente = clienti.find(cliente => cliente.cod_cliente == codiceUtente);

// codiceTrovato.forEach(elemento =>{
  let metodoPagamento;
  let bonifico = document.querySelector("#bonifico").checked;
  let cartaCredito = document.querySelector("#cartaCredito").checked;

  if(bonifico){
    metodoPagamento = "bonifico";
  }else{
  metodoPagamento = "cartaCredito";
  }
  console.log(metodoPagamento);

  const dataAttuale = new Date();
  biglietto = {
   cod_cliente: codiceCliente,
   cod_replica: codiceReplica,
   data_ora: dataAttuale.toISOString(),
   tipo_pagamento: metodoPagamento,
   quantita: arrayRecuperato[2],
     data: arrayRecuperato[1]
 };

           console.log(biglietto);


           fetch(URL2, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(biglietto)
          })
          .then(response => response.json())
          .then(message => {
            console.log(message); 
          })
          .catch(error => {
            console.error("Error:", error);
          });

          window.open("form1.html", "_blank");
          
}
              
          }
          
          )

})
  

