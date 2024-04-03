const planets_list = document.querySelectorAll(".planet")
const sun = document.getElementById("soleil")

function addSelectionFX(body){
    const bodyActif = document.getElementById(body)
    bodyActif.style.filter = "drop-Shadow(0 0 7px red)"
    document.getElementById("asteroidBelt").style.filter = ""
}

function removeSelectionFX() {
    sun.style.filter = ""
    for (let planet of planets_list){
        document.getElementById(planet.id).style.filter = ""
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

    MoveIn()
}

async function getBodyData(body, callback) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("https://api.le-systeme-solaire.net/rest/bodies/"+body, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const data = result
            console.log(result)
            callback(result)
        })
        .catch((error) => console.error(error))
}

sun.addEventListener("click", () => {
    getBodyData(sun.id, displayProperties)
    removeSelectionFX()
})


for (let planet of planets_list){
    planet.addEventListener("click", () => {
        getBodyData(planet.id, displayProperties)
        removeSelectionFX()
        addSelectionFX(planet.id)
    })
}