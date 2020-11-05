/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,gamePlaying,previousDice;


init();
// scores = [0,0];
// roundScore = 0 ;
// activePlayer = 0; 

// dice = Math.floor(Math.random()*6) + 1; 

//TEXT CONTEXT manda texto plano a la pagina
//document.querySelector('#current-' + activePlayer).textContent = dice;
//MIENTRAS QUE innerHTML podes editar fuentes , etc.
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+dice+'</em>'


//LEER VARIABLE DESDE QUERY SELECTOR
//CON QUERY SELECTOR PODEMOS SETEAR PERO TAMBIEN LEER (SETTER Y GETTER)

// var x = document.querySelector('#score-0').textContent;
// console.log(x);

//SETEO CON EL QUERY SELECTOR EL DADO A NONE, PARA QUE NO LO MUESTRE LA PRIMERA VEZ
document.querySelector('.dice').style.display = 'none' ; 

//seteamos todo en 0 para que la primera vez que se entre este todo en 0
document.getElementById('score-0').textContent = '0'
document.getElementById('score-1').textContent = '0'
document.getElementById('current-0').textContent = '0'
document.getElementById('current-0').textContent = '0'


//EVENTS AND FUNCIONES EVENT HANDLER
//ADD EVENT LISTENER RECIBE DOS PARAMETROS(EL PRIMERO ES EL TIPO EVENTO YA SEA CLICK, DOBLE CLICK, TECLADO, ETC.)
//NO LLEVA PARENTESIS YA QUE ES UNA CALLBACK FUNCTION , ES DECIR QUE LA FUNCION
//ADD EVENT LISTENER VA A LLAMAR A LA FUNCION BTN POR NOSOTROS
// document.querySelector('btn-roll').addEventListener('click', btn)
//FUNCION ANONIMA:NO TIENE UN NOMBRE Y NO PUEDE SER REUSADA,SE DEFINE DENTRO DEL PARAMETRO
//ADD EVENT LISTENER POR SI NO QUEREMOS TENER LA FUNCION AFUERA
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
//1. se necesita un numero random que ya habia definido antes,
    //pero no se necesita cuando mi pagina cargue, sino dentro de esta funcion anonima
    var dice = Math.floor(Math.random()*6) + 1; 

    //2. Mostrar el resultado
    //setear el dado como BLOCK ya que estaba en NONE
    //creo variable para reutilizar la variable DOM para setear las imagenes del dado
    var diceDOM = document.querySelector('.dice')
    diceDOM.style.display = 'block';
    diceDOM.src ='dice-' + dice + '.png';

    
    //3.Updatear el round score solo SI el numero no fue un 1 
    if(dice !== 1) {
        //agrego el score
        roundScore += dice;
        document.querySelector('#current-' +activePlayer).textContent = roundScore;
       
    }else{
        //turno del otro
        //usamos el operador ternario para simplificarlo en una sola linea
        // activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        // roundScore = 0 ;
        // //seteamos los valores a 0 en la interfaz para que sea visible el cambio
        // document.getElementById('current-0').textContent = '0' ;
        // document.getElementById('current-1').textContent = '0' ;
        // //CAMBIAR QUE JUGADOR ESTA ACTIVO
        // //removemos el activo de jugador 1 la clase de panel activo
        // //CON TOGGLE SI CAMBIA DE JUGADOR
        // document.querySelector('.player-0-panel').classList.toggle('active')
        // document.querySelector('.player-1-panel').classList.toggle('active');
        

        // document.querySelector('.dice').style.display = 'none'
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');

        //CON LA FUNCION YA CREADA LUEGO LLAMO DIRECTAMENTE A LA FUNCION NEXT PLAYER

        nextPlayer();
    }
    }
    
});

//BOTON HOLD
document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){

        //1. Agregar el current score al global score
    scores[activePlayer] += roundScore;


    //2. Actualizar el UI (USER INTERFACE)
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]


    //3. Chequear si el jugador gano el juego
    //seteamos el dado en none para que no se muestre mas cuando gane
    //seteamos para que se agregue la clase winner de CSS en lugar del panel donde dice Player X
    //y removemos el active player
    if(scores[activePlayer]>=20){
        document.getElementById('name-'+ activePlayer).textContent ='Winner!' ;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }else{
        nextPlayer();
    }
    }
    
});


//BUTTON NEW GAME
//PASAMOS POR PARAMETRO LA FUNCION INIT SIN LOS PARENTESIS
//YA QUE SI PONEMOS PARENTESIS LA ESTAMOS LLAMANDO INMEDIATAMENTE
//y queremos que el event listener haga eso por nosotros
document.querySelector('.btn-new').addEventListener('click',init)






function nextPlayer(){

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
        roundScore = 0 ;
       
        document.getElementById('current-0').textContent = '0' ;
        document.getElementById('current-1').textContent = '0' ;
       
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        

        document.querySelector('.dice').style.display = 'none';
}


function init(){
   scores = [0,0];
   activePlayer = 0;
   roundScore = 0;
   gamePlaying = true;
   document.querySelector('.dice').style.display = 'none' ; 
//seteamos todo en 0 para que la primera vez que se entre este todo en 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


