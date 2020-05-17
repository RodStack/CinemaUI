const container = document.querySelector('.container'); //Selecciona un elemento por clase 
const seats = document.querySelectorAll('.row .seat:not(.occupied)'); //Toma todos los tipos de elemento en una node list
const count = document.getElementById('count'); // Selecciona elemento por id 
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value; //el + reemplaza la funccion parseInt que transforma el tipo de data a numbero
// console.log(typeof ticketPrice); typeof muestra el tipo de data 

// Guardar pelicula y precio en local storage
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex); //Toma el index y lo guarda en la base de dato del browser 
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Actualiza el total y la cuenta
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected'); //selecciona solo los asientos que estan fila selecionados

    const seatsIndex = [...selectedSeats].map(function (seat) { //Copiar los asientos seleccionados de la node list y lo transforma en array 
        return [...seats].indexOf(seat); //devuelve un arrray de los indexes value de los asientos
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex)); //Guarda el array seatIndex en el browser local storage
    //JSON,stringify limpia un objecto o un array para uso de sus datos

    const selectedSeatsCount = selectedSeats.length; //cuenta los elemetos de la lista node creada al selecionarlos

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;

}

//Toma los datos de local storage y los muestra en la pantalla
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); //agrega los datos de array u objeto

    if(selectedSeats !== null && selectedSeats.length > 0) {//primero checkeamos si la variable esta declarada ene local storage y luego chekeamos si es un array vacio
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {//si checkeamos con indexOf y no esta el valor que buscamos devuelve -1
                 seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Evento de seleccion de pelicula
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Evento de selecion de asiento 
container.addEventListener('click', (e) => {
    // console.log(e.target); .target muestra el elemento que se seleciona
    if (
        e.target.classList.contains('seat') &&
        !e.target.classList.contains('occupied')
    ) {
        //e.target.classList.add = agrega clase especificada
        //e.target.classList.remove = remueve clase especificada
        e.target.classList.toggle('selected'); //alterna la clase especificada

        updateSelectedCount();
    }
});


// Actualiza la cuenta y el total

updateSelectedCount();
