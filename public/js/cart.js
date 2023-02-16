let tableBody = document.querySelector('#cart-tablebody');
let totalPanier = 0;
let sousTotal = document.querySelector('.subtotal');
let formCheckout = document.getElementById('checkout');
let products = [];

// Vérification si le panier n'est pas vide
if (localStorage.length > 0) {
    // Lire le localStorage grace à la boucle for()
    for (key in localStorage) {
        // On récupère le produit associé à la clé (id du produit)
        let product = localStorage.getItem(key);

        // On vérifie l'éxistance du produit
        if (product) {
            // Transformation du JSON en objet grace à JSON.parse()
            product = JSON.parse(product);

            // Ajout du produit dans le tableau panier
            tableBody.innerHTML += `
            <tr>
                <td><img style="height:80px; width:80px; object-fit:cover;" src="${product.imageUrl}"></td>
                <td>${product.name}</td>
                <td>${convertPrice(product.price)} €</td>
                <td>1</td>
            </tr>
            `;

            // Ajout du prix produit au totalPanier
            totalPanier += product.price;

            // Ajout l'ID du produit dans le tableau products (pour l'envoi POST)
            products.push(product._id);
        }
    }
} else {
    tableBody.innerHTML = `
    <tr class="text-dark text-center">
        <td colspan="4">
            Votre panier est vide pour le moment...<br>
            <a class="btn btn-success" href="Index.html">Consulter le catalogue</a>
        </td>
    </tr>`;
}

// Ajouter le chiffre total du panier //
sousTotal.innerText = convertPrice(totalPanier);

// Vider le panier //
const nettoyer = document.querySelector(".clear-cart")

nettoyer.addEventListener('click', function() {
    localStorage.clear(); // Permet de supprimer tout le localStorage
    tableBody.innerHTML = `
    <tr class="text-dark text-center">
        <td colspan="4">
            Votre panier est maintenant vide...<br>
            <a class="btn btn-success" href="Index.html">Consulter le catalogue</a>
        </td>
    </tr>`;
});

// Ecouteur lorsque le formulaire est envoyé
formCheckout.addEventListener("submit", send);

// Envoie des données de l'utilisateur //
function send(e) {
    e.preventDefault();

    // Vérif des champs
    if (!checkFormValidation(formCheckout)) {
        alert("Veuillez renseigner correctement les champs présents !");
    } else {
        let formData = new FormData(formCheckout);
        let contact = {};

        // Affichage des paires clefs/valeurs
        for(let pair of formData.entries()) {
            //console.log(pair[0]+ ', '+ pair[1]);
            contact[pair[0]] = pair[1];
        }

        let dataToServer = JSON.stringify({
            contact: contact,
            products: products
        });

        //console.log(dataToServer);

        // Requête HTTP
        fetch('http://localhost:3000/api/furniture/order/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: dataToServer
        })
        .then(response => response.json())
        .then(response => {
            // Instructions à excuter lorsque le serveur répond
            console.log(response);

            // Ajouter l'orderId dans le sessionStorage
            sessionStorage.setItem("order", JSON.stringify(response.orderId));

            // Supprimer le localStorage
            localStorage.clear();

            // Redirection vers la confirmation
            redirect('confirm.html');
        })
        .catch(error => { console.log('Erreur : ' + error) });
    }
}