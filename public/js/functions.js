function convertPrice(price) {
    return (price/100).toFixed(2);
}

function redirect(url) {
    window.location.href = url;
}

function nettoyerLocalPanier(localStorage) {
    localStorage.clear(); // Permet de supprimer tout le localStorage
}

function nettoyerSessionPanier(sessionStorage) {
    sessionStorage.clear();
}

let product = 'test';

function ajouterPanier(data, element){
    let product = JSON.stringify(data);

    // Ajouter le produit dans le localStorage
    localStorage.setItem(data._id, product);

    // Message pour le user
    element.innerText = "Ajouté au panier !";
}

function checkFormValidation(form) {
    let inputs = form.querySelectorAll('input, select, textarea');
    let errorCount = 0;

    for (let input of inputs) {
        if (input.value == '') errorCount ++;

        if(input.name == 'email'){
            errorCount ++;
        }

    }
        form.classList.add('was-validated');

    if (errorCount > 0) {
        return false;
    } else {
        return true;
    }
}