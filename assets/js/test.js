const divPlanets_list = Array.from(document.querySelectorAll(".planet"))
const textPlanets_list = Array.from(document.querySelectorAll(".selectBody__body"))

const sun = document.getElementById("soleil")

function addSelectionFX(body){
    console.log(body)
    if(body.id != "soleil"){
        body.style.filter = "drop-Shadow(0 0 7px red)"
    }
    //document.getElementById(planet.dataset.body)
}

function removeSelectionFX() {
    for (let planet of divPlanets_list){
        planet.style.filter = ""
    }
    for (let planet of textPlanets_list){
        planet.style.fontWeight = 400
    }
}

function displayProperties(body) {
    document.getElementById("nomBody").innerText = body.name
    let type = ''
    if(body.bodyType == "Star"){
        document.getElementById("bodyTypeValue").innerText = "Etoile"
    }else{
        document.getElementById("bodyTypeValue").innerText = "Planète"
    }
    document.getElementById("bodySizeValue").innerText = `${body.meanRadius} km`
    document.getElementById("bodyMassValue").innerText = `${body.mass.massValue} 10^${body.mass.massExponent}`
    if(body.avgTemp == 0){
    document.getElementById("bodyTempValue").innerText = "NA"
    }
    else{
    document.getElementById("bodyTempValue").innerText = `${body.avgTemp} °K =~ ${body.avgTemp-273}°C`
    }
    document.getElementById("bodyDistValue").innerText = `~ ${(body.aphelion+body.perihelion)/2} Km`
    document.getElementById("bodyOrbitTimeValue").innerText = `${body.sideralOrbit} jours / ${(body.sideralOrbit/365.25).toFixed(3)} année(s)`
    if(body.moons){
        document.getElementById("bodySatellitesCountValue").innerText = `${body.moons.length}`
    }
    else{
        document.getElementById("bodySatellitesCountValue").innerText = "0"
    }
    if(body.bodyType == "Star"){
        document.getElementById("lienWiki").innerHTML = `<a href=https://fr.wikipedia.org/wiki/${body.name} target="_blank">En savoir plus</a>`
    }
    else{
        document.getElementById("lienWiki").innerHTML = `<a href=https://fr.wikipedia.org/wiki/${body.name}_(planète) target="_blank">En savoir plus</a>`
    }

    MoveIn()
}

async function getBodyData(body, callback) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://api.le-systeme-solaire.net/rest/bodies/${body}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const data = result
            console.log(result)
            callback(result)
        })
        .catch((error) => console.error(error))
}

sun.addEventListener("click", () => {
    getBodyData(sun.dataset.body, displayProperties)
    removeSelectionFX()
})

for (let planet of divPlanets_list){
    planet.addEventListener("click", () => {
        getBodyData(planet.dataset.body, displayProperties)
        removeSelectionFX()
        addSelectionFX(planet)
    })
}

for (let planet of textPlanets_list){
    planet.addEventListener("click", () => {
        getBodyData(planet.dataset.body, displayProperties)
        removeSelectionFX()
        addSelectionFX(document.getElementById(planet.dataset.body))
        planet.style.fontWeight = 600
    })
}