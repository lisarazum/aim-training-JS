const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let colors = ['#3BB1CA', '#0081CF', '#673CA8', '#4FFCBB', '#DC37F8', '#B592FE', '#C456B2', '#B4125F']

let time = 0
let score = 0
let games = localStorage.setItem('gamesPlayed', '0')
let gamesPlayed = +localStorage.getItem('gamesPlayed')

startBtn.addEventListener('click', (event) => {
  event.preventDefault()
  startBtn.parentElement.classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    timeList.parentElement.classList.add('up')
    time = parseInt(event.target.getAttribute('data-time'))
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

let mySetInterval

function startGame() {
  mySetInterval = setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
    clearInterval(mySetInterval)
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function finishGame() {
  timeEl.parentElement.classList.add('hide')
  board.innerHTML = `
  <h2>Ваш счет: <span class="primary">${score}</span></h2>
  <p class="games-played">Сыграно игр: ${gamesPlayed+1}</p>
  <button id="repeatGame">Начать заново</button>
  `
  const repeatGame = document.querySelector('#repeatGame')
  repeatGame.addEventListener('click', () => {
    screens[1].classList.remove('up')
    timeEl.parentElement.classList.remove('hide')
    score = 0
    board.innerHTML = ''
    gamesPlayed++
  })
}


function createRandomCircle() {
  const circle = document.createElement('div')
  const size = getRandomNumber(20, 60)
  const {width, height} = board.getBoundingClientRect()
  
  const x = getRandomNumber(0, width - size)
  const y = getRandomNumber(0, height - size)
  circle.classList.add('circle')
  circle.style.width = `${size}px`
  circle.style.height = `${size}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = `linear-gradient(90deg, ${getRandomColor()}, ${getRandomColor()})`
  board.append(circle)
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length)
  return colors[index]
}