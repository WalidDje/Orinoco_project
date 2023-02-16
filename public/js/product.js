let url = new URL(window.location);
let id = url.searchParams.get("id");
console.log(id);

// Requête pour récupèrer les données du serveur (on précise l'id du produit à récupèrer)
fetch("http://localhost:3000/api/furniture/"+id)
.then(response => response.json())
.then(response => {
    //console.log(response);

    // Récupèration des noeuds ayant la class spécifiée dans le document HTML
    let titre = document.querySelector('.titre');
    let image = document.querySelector('.img-fluid');
    let description = document.querySelector('.description');
    let prix = document.querySelector('.prix');

    // Ajout des données dans le document HTML
    titre.innerText = response.name;
    image.src = response.imageUrl;
    description.innerText = response.description;
    prix.innerText = convertPrice(response.price);

    //*************** Ajouter le produit au panier   ************************** */
    const ajoutPanier = document.querySelector('.add-to-cart');
    ajoutPanier.addEventListener("click", () => {
        ajouterPanier(response, ajoutPanier);
    });
})
// .catch(error => console.error("Erreur : " + error));
