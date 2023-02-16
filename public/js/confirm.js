let tableBody = document.querySelector('#cart-tablebody');

// Vérification si le panier n'est pas vide
if (sessionStorage.length > 0) {
    // On récupère le produit associé à la clé (id du produit)
    let orderId = sessionStorage.getItem("order");

    if (orderId) {
        tableBody.innerHTML = `
        <p>Votre commande est bien enregistrée sour le n° ${orderId}.</p>
        <p>Merci pour votre achat !</p>
        <hr>
        <a class="btn btn-success" href="index.html">Retour à la liste</a>
        `;
    }

    // On supprime le sessionStorage
    sessionStorage.clear();
} else {
    tableBody.innerHTML = `
    <p>Vous n'avez pas effectué de commande pour le moment</p>
    <hr>
    <a class="btn btn-success" href="index.html">Voir le catalogue</a>
    `;
}
