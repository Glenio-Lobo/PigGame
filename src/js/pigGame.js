'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dice from './imageBundle.js'; //Conjunto de dices para funcionar com o budling do parcel.

/* Poderia usar também goble, /assets/*.png . Porém cria um objetor contendo todos os paths necessários.*/
//Jogador Um
let playerOne = document.querySelector('.player--0');
let playerOneScore = document.querySelector('.player-0--score');
let playerOneCurrent = document.querySelector('.player-0--current');

//Jogador Dois
let playerTwo = document.querySelector('.player--1');
let playerTwoScore = document.querySelector('.player-1--score');
let playerTwoCurrent = document.querySelector('.player-1--current');

//Botões
const holdButton = document.querySelector('.btn--hold');
const restartButton = document.querySelector('.btn--newgame');
const rollButton = document.querySelector('.btn--dice');
const diceImage = document.querySelector('.dice');

let diceNumber = 0;

//Indica o jogado atual
let currentPlayer = 0;

// Posição 0 representa o score do jogador 1
// Posição 1 representa o score do jogador 2
let currentScore = 0;
let score = [0,0];

//Estado do jogo
let termino = false;

//Função de Expressão para trocar os players
const switchPlayer = function (){
    //Retirando a classe ativa do player passado
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    playerOne.classList.toggle('player--active');
    playerTwo.classList.toggle('player--active');

}

//Reiniciando o jogo
restartButton.addEventListener('click', 
    function (){
        diceImage.style.display = 'none';
        score[0] = 0;
        score[1] = 0;
        currentScore = 0;
        currentPlayer = 0;
        termino = false;
        playerOne.classList.add('player--active');
        playerTwo.classList.remove('player--active');
        playerOne.classList.remove('player--winner');
        playerTwo.classList.remove('player--winner');
        playerOneScore.textContent = '0';
        playerOneCurrent.textContent = '0';
        playerTwoScore.textContent = '0';
        playerTwoCurrent.textContent = '0';
    }
);

//Rolling the DICE
rollButton.addEventListener('click',
    function (){
        if(!termino){
            //Gerando um valor de dado aleatório e Mudando o dado na tela
            diceNumber = Math.trunc(Math.random()*6)+1;
            // diceImage.src = `./src/img/dice-${diceNumber}.png`; Não funciona com parcel.
            diceImage.src = dice[diceNumber-1];
            diceImage.style.display = 'block';

            //Adicionando pontos ao score

            currentScore = diceNumber !== 1 ? currentScore+diceNumber : 0;
            document.querySelector(`.player-${currentPlayer}--current`).textContent = currentScore;

            if (diceNumber === 1){
                document.querySelector(`.player-${currentPlayer}--score`).textContent = 0;
                score[currentPlayer] = 0;
                switchPlayer();
            }
        }
    }
);

//Hold Button para guardar o Score
holdButton.addEventListener('click',
    function (){

        if(!termino){
            score[currentPlayer] += currentScore;

            //Verifica de o jogador ganhou na rodada atual
            if(score[currentPlayer] >= 100){
                //termina o jogo, bloqueia os botões
                termino = true;
                document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            }

            // Zera o as variáveis necessárias e os pontos atuais do jogador
            document.querySelector(`.player-${currentPlayer}--score`).textContent = score[currentPlayer];
            currentScore = 0;
            document.querySelector(`.player-${currentPlayer}--current`).textContent = 0;

            //Verifica de o jogador ganhou na rodada atual, se sim, não muda o player
            if(termino !== true) switchPlayer();
        }
    }
);