const container = document.querySelector('.container'); //Selecciona un elemento por clase 
const seats = document.querySelectorAll('.row .seat:not(.occupied)');//Toma todos los tipos de elemento en una node list
const count = document.getElementById('count');// Selecciona elemento por id 
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');


let ticketPrice = +movieSelect.value;//el + reemplaza la funccion parseInt que transforma el tipo de data a numbero
// console.log(typeof ticketPrice); typeof muestra el tipo de data 

// Actualiza el total y la cuenta
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');//selecciona solo los asientos que estan fila selecionados
    
    const selectedSeatsCount = selectedSeats.length;//cuenta los elemetos de la lista node creada al selecionarlos

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
    
}

 //Evento de seleccion de pelicula
 movieSelect.addEventListener('change', e => {
     ticketPrice = +e.target.value;
     updateSelectedCount();
 })

// Evento de selecion de asiento 
container.addEventListener('click', (e) => {
    // console.log(e.target); .target muestra el elemento que se seleciona
    if(
        e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')
    ) {
        //e.target.classList.add = agrega clase especificada
        //e.target.classList.remove = remueve clase especificada
        e.target.classList.toggle('selected'); //alterna la clase especificada

        updateSelectedCount();
    }
});