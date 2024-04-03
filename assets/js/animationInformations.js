function MoveIn() {
    let id = null;
    const elem = document.getElementById("systeme__informations");
    let pos = -450;
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

//const btnFermeture = document.getElementById("infos-btn-fermeture");


function MoveOut() {
    let id = null;
    const elem = document.getElementById("systeme__informations");
    let pos = 0;
    clearInterval(id);
    id = setInterval(frame, 3);
    function frame() {
        if (pos == -450) {
        clearInterval(id);
        } else {
        pos--;
        //elem.style.top = pos + 'px';
        elem.style.left = pos + 'px';
        }
    }
}

document.getElementById("infos-btn-fermeture").addEventListener('click', () => {
    MoveOut()
})