const planets_list = document.querySelectorAll(".planet")
const sun = document.getElementById("soleil")


function displayProperties(body) {
    document.getElementById("nomBody").innerText = body.name
    document.getElementById("bodySizeValue").innerText = `${body.meanRadius} km`
    document.getElementById("bodyMassValue").innerText = `${body.mass.massValue} 10^${body.mass.massExponent}`
    MoveIn()
}

async function getBodyData(body, callback) {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    /*try {
        const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${body}`, requestOptions)
        const data = await response.json()
        callback(data)
    }
    catch {
        console.log("error")
    }*/

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
})


for (let planet of planets_list){
    planet.addEventListener("click", () => {
        getBodyData(planet.id, displayProperties)
    })
}