document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#chooser")
  form.addEventListener('submit', (e) => {
      const input = document.querySelector("#pokedexInput")
       e.preventDefault()
       selector(input.value)
        form.reset()
    }) 
})

const likeButton = document.querySelector("#likeButton")
likeButton.addEventListener('click', like)

function like(){
    alert('You liked the page!')
}

let cpuRandom = document.querySelector("#cpuRandomizer")
cpuRandom.addEventListener('click', randomizeCPU)

function randomizeCPU(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0')
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        let randomPoke = (data.results[Math.floor(Math.random() * data.results.length)])
        //console.log(randomPoke)
        //console.log(randomPoke.url)
        fetch(randomPoke.url)
        .then(res => res.json())
        .then(data => renderPokeCPU(data))

    }) 
}

function renderPokeCPU(obj){
    let received = {...obj}
    let display = document.querySelector("#displayCPU")
    display.innerHTML = ""
    let newDisplay = document.createElement('div')
    newDisplay.setAttribute('id', 'cpuPokeDisplay')
    let newPoke = document.createElement('img')
    newPoke.setAttribute('id', 'cpuPoke')
    newPoke.src = received.sprites.front_default
    let newPokeType = document.createElement('h4')
    newPokeType.setAttribute('id', 'cpuType')
    newPokeType.innerHTML = received.types['0'].type.name
    let newPokeWeight = document.createElement('h3')
    newPokeWeight.setAttribute('id', 'cpuWeight')
    newPokeWeight.innerHTML = received.weight
    newPoke.appendChild(newPokeWeight)
    newPoke.appendChild(newPokeType)
    newDisplay.appendChild(newPoke)
    display.append(newDisplay)
}

let random = document.querySelector("#randomizer")
random.addEventListener('click', randomizePlayer)

function randomizePlayer(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0')
    .then(res => res.json())
    .then(data => {
        //console.log(data)
        let randomPoke = (data.results[Math.floor(Math.random() * data.results.length)])
        //console.log(randomPoke)
        //console.log(randomPoke.url)
        fetch(randomPoke.url)
        .then(res => res.json())
        .then(data => renderPokePlayer(data))

    })
}

function renderPokePlayer(obj){

    let received = {...obj}
    let display = document.querySelector("#displayPlayer1")
    display.innerHTML = ""
    let newDisplay = document.createElement('div')
    newDisplay.setAttribute('id', 'playerPokeDisplay')
    let newPoke = document.createElement('img')
    newPoke.setAttribute('id', 'playerPoke')
    newPoke.src = received.sprites.front_default
    let newPokeType = document.createElement('h4')
    newPokeType.setAttribute('id', 'playerType')
    newPokeType.innerHTML = received.types['0'].type.name
    let newPokeWeight = document.createElement('h3')
    newPokeWeight.setAttribute('id', 'playerWeight')
    newPokeWeight.innerHTML = received.weight
    newPoke.appendChild(newPokeWeight)
    newPoke.appendChild(newPokeType)
    newDisplay.appendChild(newPoke)
    display.appendChild(newDisplay)
    
}

function selector(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(res => res.json())
    .then(data => renderPokePlayer(data))
}

let battle = document.querySelector("#battle")
battle.addEventListener('click', calculateWinner)

let cpuScore = 0
let playerScore = 0

function calculateWinner(){
    let playerScoreContainer = document.querySelector("#playerScore")
    let cpuScoreContainer = document.querySelector("#cpuScore")
    let playerPokeType = document.querySelector("#playerType").innerHTML
    let cpuPokeType = document.querySelector("#cpuType").innerHTML
    let playerPokeTypeArr = typeChart[playerPokeType]
    let cpuPokeTypeArr = typeChart[cpuPokeType]
    //console.log(playerPokeType)
    //console.log(cpuPokeType)
    //console.log(typeChart[playerPokeType])


    if (cpuWins = playerPokeTypeArr.includes(cpuPokeType)){
        cpuScore = cpuScore + 1
        cpuScoreContainer.innerHTML = cpuScore
        return alert(`You lose: ${cpuPokeType} beats ${playerPokeType}!`)
    }
    
    if (playerWins = cpuPokeTypeArr.includes(playerPokeType)){
        playerScore = playerScore + 1
        playerScoreContainer.innerHTML = playerScore
        return alert(`You win: ${playerPokeType} beats ${cpuPokeType}!`)
    }

    if(playerWins === cpuWins){
        alert('No winner by type. Let\'s check their weights!')
        let playerWeight = document.querySelector("#playerWeight").innerHTML
        let cpuWeight = document.querySelector("#cpuWeight").innerHTML

        if(parseInt(playerWeight) > parseInt(cpuWeight)){
            playerScore = playerScore + 1
            playerScoreContainer.innerHTML = playerScore
            let cpuWKG = (cpuWeight / 10)
            let playerWKG = (playerWeight / 10)
            return alert(`You win: ${playerWKG} kg > ${cpuWKG} kg!`)
        }

        if (parseInt(cpuWeight) > parseInt(playerWeight)){
            cpuScore = cpuScore + 1
            cpuScoreContainer.innerHTML = cpuScore
            let cpuWKG = (cpuWeight / 10)
            let playerWKG = (playerWeight / 10)
            return alert(`You lose: ${cpuWKG} kg > ${playerWKG} kg!`)
        }

        if (parseInt(cpuWeight) === parseInt(playerWeight)){
            return alert('What are the odds? No winner by type or weight!')
        }
    }
}

const typeChart = {
    normal: ['fighting'],
    fire: ['water', 'rock', 'ground'],
    water: ['electric', 'grass'],
    electric: ['ground'],
    grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
    ice: ['fire', 'fighting', 'rock', 'steel'],
    fighting: ['flying', 'psychic', 'fairy'],
    poison: ['ground', 'psychic'],
    ground: ['water', 'ice', 'grass'],
    flying: ['electric', 'ice', 'rock'],
    psychic: ['dark', 'bug', 'ghost'],
    bug: ['fire', 'flying', 'rock'],
    rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
    ghost: ['dark'],
    dragon: ['fairy', 'ice'],
    dark: ['fighting', 'bug', 'fairy'],
    steel: ['fire', 'fighting', 'ground'],
    fairy: ['poison', 'steel']
}



