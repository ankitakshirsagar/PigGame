/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, dice1;

var lastDice;

var inputWin;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    
   
    
   if(gamePlaying) {
        //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
       
    var dice1 = Math.floor(Math.random() * 6) + 1;
       
    
    //2. display the result
    var diceDOM = document.querySelector('.dice');
    var diceDOM1 = document.querySelector('.dice1');
    diceDOM.style.display = 'block';
    diceDOM1.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    
    //3. update the round score IF the rolled number was NOT 1
       if(dice === 6 && lastDice === 6){
           scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
           nextPlayer();
       }
    if(dice !== 1 && dice1 !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        //Move to next player
        nextPlayer();
    }
        lastDice = dice;
   }
    
});


document.querySelector('.btn-hold').addEventListener('click', function() {
   if(gamePlaying)
       {
            //Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
           
           setWinScore();
    
    //check if player won the game
        if(scores[activePlayer] >= inputWin)
            {
                document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
                document.querySelector('.dice').style.display = 'none';
                document.querySelector('.dice1').style.display = 'none';
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
                gamePlaying = false;
            }
        else
            {  
            //Move to next player
            nextPlayer();
            }
       }
   
});



function nextPlayer() {
    if(activePlayer === 0)
            {
                activePlayer = 1;
            } 
        else 
            {
                activePlayer = 0;
            }
        roundScore = 0;
         
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //remove dice display at start
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

    //initialise all scores to 0
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    //change names to orignal
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //remove winner class from both players
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    //remove active class 
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    //bring player 1 to be active class at new game
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

function setWinScore() {
    
    inputWin = document.getElementById("winScore").value;
}




















