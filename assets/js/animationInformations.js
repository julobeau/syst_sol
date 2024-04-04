let panneauOuvert = false

function MoveIn() {
    if(!panneauOuvert){
        let id = null;
        const elem = document.getElementById("systeme__informations");
        let width = elem.offsetWidth + 50
        let pos = -width;
        clearInterval(id);
        id = setInterval(frame, 3);
        function frame() {
            if (pos == 0) {
            clearInterval(id);
            } else {
            pos++;
            //elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
            }
        }
    }
    panneauOuvert = true
}

//const btnFermeture = document.getElementById("infos-btn-fermeture");


function MoveOut() {
    if(panneauOuvert){
        let id = null;
        const elem = document.getElementById("systeme__informations");
        let width = elem.offsetWidth + 50
        let pos = 0;
        clearInterval(id);
        id = setInterval(frame, 3);
        function frame() {
            if (pos == -width) {
            clearInterval(id);
            } else {
            pos--;
            //elem.style.top = pos + 'px';
            elem.style.left = pos + 'px';
            }
        }
    }
    panneauOuvert = false
    removeSelectionFX()
}

document.getElementById("infos-btn-fermeture").addEventListener('click', () => {
    MoveOut()
})