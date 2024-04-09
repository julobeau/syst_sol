const divPlanetsList = Array.from(document.querySelectorAll(".planet"))

const textPlanetsList = Array.from(document.querySelectorAll(".systeme__selectBody__body"))
const textSun = textPlanetsList.shift()

const sun = document.getElementById("soleil")

const displayInfosFields = {
    'bodyName': document.getElementById("nomBody"),
    'bodyType': document.getElementById("bodyTypeValue"),
    'bodySize': document.getElementById("bodySizeValue"),
    'bodyMass': document.getElementById("bodyMassValue"),
    'bodyTemp': document.getElementById("bodyTempValue"),
    'bodyDist': document.getElementById("bodyDistValue"),
    'bodyOrbitTime': document.getElementById("bodyOrbitTimeValue"),
    'bodySatellites': document.getElementById("bodySatellitesCountValue"),
    'lienWiki': document.getElementById("lienWiki")
}

let bodySelected = ""

function addSelectionFX(body){
    if(body.dataset.body != "soleil"){
        body.style.filter = "drop-Shadow(0 0 7px red)"
        for(let planet of textPlanetsList){
            if(planet.dataset.body == body.id){
                planet.style.fontWeight = 600
            }
        }
    }
    else{
        textSun.style.fontWeight = 600
    }
}

function removeSelectionFX() {
    if(bodySelected != "" && bodySelected.dataset.body != "soleil"){
        bodySelected.style.filter = ""
        for (let planet of textPlanetsList){
            if(planet.dataset.body == bodySelected.id){
                planet.style.fontWeight = 400
            }
        }
    }
    else if(bodySelected != "" && bodySelected.dataset.body == "soleil"){
        textSun.style.fontWeight = 400
    }
}

function displayProperties(body) {
    displayInfosFields.bodyName.innerText = body.name
    if(body.bodyType == "Star"){
        displayInfosFields.bodyType.innerText = "Etoile"
    }else{
        displayInfosFields.bodyType.innerText = "Planète"
    }
    displayInfosFields.bodySize.innerText = `${body.meanRadius} km`
    displayInfosFields.bodyMass.innerText = `${body.mass.massValue} 10^${body.mass.massExponent}`
    if(body.avgTemp == 0){
        displayInfosFields.bodyTemp.innerText = "NA"
    }
    else{
        displayInfosFields.bodyTemp.innerText = `${body.avgTemp} °K =~ ${body.avgTemp-273}°C`
    }
    displayInfosFields.bodyDist.innerText = `~ ${(body.aphelion+body.perihelion)/2} Km`
    displayInfosFields.bodyOrbitTime.innerText = `${body.sideralOrbit} jours / ${(body.sideralOrbit/365.25).toFixed(3)} année(s)`
    if(body.moons){
        displayInfosFields.bodySatellites.innerText = `${body.moons.length}`
    }
    else{
        displayInfosFields.bodySatellites.innerText = "0"
    }
    if(body.bodyType == "Star"){
        displayInfosFields.lienWiki.innerHTML = `<a href=https://fr.wikipedia.org/wiki/${body.name.split(" ")[1]} target="_blank">En savoir plus</a>`
    }
    else if(body.name == "La Terre"){
        displayInfosFields.lienWiki.innerHTML = `<a href=https://fr.wikipedia.org/wiki/${body.name.split(" ")[1]}_(planète) target="_blank">En savoir plus</a>`
    }
    else{
        displayInfosFields.lienWiki.innerHTML = `<a href=https://fr.wikipedia.org/wiki/${body.name}_(planète) target="_blank">En savoir plus</a>`
    }

    MoveIn()
}

function getBodyData(body, callback) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`https://api.le-systeme-solaire.net/rest/bodies/${body}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            callback(result)
        })
        .catch((error) => console.error(error))
}


function addClickBody(element) {
    element.addEventListener("click", () => {
        getBodyData(element.dataset.body, displayProperties)
        removeSelectionFX()
        addSelectionFX(document.getElementById(element.dataset.body))
        bodySelected = document.getElementById(element.dataset.body)
    })
}

for(let i = 0; i <= divPlanetsList.length-1; i++){
    addClickBody(divPlanetsList[i])
    addClickBody(textPlanetsList[i])
}
addClickBody(sun)
addClickBody(textSun)