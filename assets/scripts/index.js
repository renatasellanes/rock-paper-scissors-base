//seleciona os botões
const btnRock = document.getElementById('rock')
const btnPaper = document.getElementById('paper')
const btnScissors = document.getElementById('scissors')
const btnStart = document.getElementById('start')
const btnReset = document.getElementById('reset')
const btnAudio = document.getElementById('audio')

//selecione areas de pontuaco e da escolha
const displayPlayerScore = document.querySelector('.player-score span')
const displayCpuScore = document.querySelector('.cpu-score span')
const displayPlayerChoice = document.querySelector('.player-choice')
const displayCpuChoice = document.querySelector('.cpu-choice')

//Seleciona as mensagens de feedback
const userWon = document.querySelector('.user-won')
const cpuWon = document.querySelector('.cpu-won')
const tieGame = document.querySelector('.tie-game')
const endMessage = document.querySelector('.end-message')

//Seleciona os audios
const bgAudio = document.getElementById('game-bg-audio')
const winAudio = document.getElementById('win-audio')
const loseAudio = document.getElementById('lose-audio')
const tieAudio = document.getElementById('tie-audio')
let audioActive = true

//Configura volume dos audios
bgAudio.volume = .15
winAudio.volume = .3
loseAudio.volume = .3
tieAudio.volume = .3

function ChangeAudio () {
    if (audioActive) {
        bgAudio.pause()
        audioActive = false
        btnAudio.innerHTML = "Music OFF"
    } else {
        bgAudio.play()
        audioActive = true
        btnAudio.innerHTML = "Music ON"
    }
}

btnAudio.onclick = ChangeAudio

function startGame () {
    // habilitar os botoes ->
    btnRock.removeAttribute('disabled')
    btnPaper.removeAttribute('disabled')
    btnScissors.removeAttribute('disabled')

    bgAudio.play()
}

//Disabilita os botoes de escolha
function disableButtons () {
    btnRock.setAttribute('disabled', true)
    btnPaper.setAttribute('disabled', true)
    btnScissors.setAttribute('disabled', true)

}
const game = new RockPaperScissors(3)
// ao clicar no botao de start, habilita os botoes de escolha

///////// comeca aqui o jogo 
btnStart.onclick = startGame
btnReset.onclick = resetGame
// ao clicar em um botao de escolha, inicia-se um roud

function displayChoiceImage (element, choice){
    element.innerHTML = ''
    const image = document.createElement('img')
    image.setAttribute('alt', `${choice} icon`)
    image.setAttribute('src', `./assets/img/${choice}.svg`)
    element.appendChild(image)

}

// funcao que inicia um novo round
function playGame (event) {
    displayCpuChoice.classList.remove('animate-blink')
    displayPlayerChoice.classList.remove('animate-blink')
    const button = event.currentTarget
    //funcao que vai iniciar o round
    const choice = button.getAttribute('id')
    const round = game.play(choice)

    displayChoiceImage(displayPlayerChoice, choice)
    displayChoiceImage(displayCpuChoice, round.cpuChoice)

    displayPlayerScore.innerHTML = round.playerPoints
    displayCpuScore.innerHTML = round.cpuPoints
    checkWinner()
}

function checkWinner() {
    if(game.roundWinner === 'player') {
        winAudio.currentTime = 0
        winAudio.play()
        displayPlayerChoice.classList.add('animate-blink')
    } else if (game.roundWinner === 'cpu') {
        loseAudio.currentTime = 0
        loseAudio.play()
        displayCpuChoice.classList.add('animate-blink')
    } else {
        tieAudio.currentTime = 0
        tieAudio.play()
        displayPlayerChoice.classList.add('animate-blink')
        displayCpuChoice.classList.add('animate-blink')
    }


    if(game.checkGameOver()){
        console.log("teste")
        disableButtons()
        endMessage.style.display = 'block'
        // vai exibir a mensagem de vitório se o player ganhar
        if(game.gameWinner === 'player') {
            userWon.style.display = 'block'
        } else if (game.gameWinner === 'cpu') {
            cpuWon.style.display ='block'
        } else {
            tieGame.style.display = 'block'
        }

       }
    }

function resetGame () {
    game.reset()
    endMessage.style.display = 'none'
    userWon.style.display = 'none'
    cpuWon.style.display ='none'
    tieGame.style.display = 'none'
    displayPlayerScore.innerHTML = game.playerPoints
    displayCpuScore.innerHTML = game.cpuPoints
    displayCpuChoice.classList.remove('animate-blink')
    displayPlayerChoice.classList.remove('animate-blink')
}


//seleciona os botoes de escolha
const choiceBtns = document.getElementsByClassName('choice-button')
for (let button of choiceBtns) {
    button.onclick = playGame
}
// ai oniciar um roud a escolha do player e a escolha da cpu devem ser exibidas
// ao fim do round a pontuacao do player e a pontuacao da cpu dvem ser exibidas
// a cada round deve-se verificar se gameOver



