document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("#chooser")
  form.addEventListener('submit', (e) => {
      let input = document.querySelector("#pokedexInput")
       e.preventDefault()
       selector(input.value)
        form.reset()
    }) 
})

let likeButton = document.querySelector("#likeButton")
likeButton.addEventListener('click', like)

function like(){
    alert('You liked the page!')
}

let random = document.querySelector("#randomizer")
random.addEventListener('click', randomize)

function randomize(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let randomPoke = (data.results[Math.floor(Math.random() * data.results.length)])
        console.log(randomPoke)
        console.log(randomPoke.url)
        fetch(randomPoke.url)
        .then(res => res.json())
        .then(data => pokeReceiver(data))

    })
}

function pokeReceiver(obj){
    let received = {...obj}
    let display = document.querySelector("#display")
    let newDisplay = document.createElement("div")
    let newPoke = document.createElement('img')
    newPoke.src = received.sprites.front_default
    let newPokeType = document.createElement('div')
    newPokeType.innerHTML = received.types['0'].type.name
    newDisplay.appendChild(newPoke,)
    newDisplay.appendChild(newPokeType)
    display.appendChild(newDisplay)
}

function selector(pokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then(res => res.json())
    .then(data => pokeReceiver(data))
}





