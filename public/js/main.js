// Requête pour récupèrer les données du serveur
fetch("http://localhost:3000/api/furniture/")
.then(response => response.json())
.then(response => {
    // Récupèration de la réponse (du résultat)
    // console.log(response);

    // Récupèration du noeud ayant l'id #liste dans le document HTML
    let liste = document.getElementById("liste");

    // On fait une boucle pour lire chaque résultat de la réponse (car c'est un tableau)
    for(product of response) {
        //console.log(product.name)

        // Ajout des données dans le document HTML (on fait += pour ajouter à la suite)
        liste.innerHTML += `
        <article class="bg-light shadow m-4">
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="${product.imageUrl}" alt="..." />
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h3 class="fw-bolder">${product.name}</h3>
                            <p>${product.description}<br>
                            <!-- Product price-->
                            Prix : ${convertPrice(product.price)}€</p>
                            <a class=" btn btn-primary " href="produit.html?id=${product._id}">Consulter</a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        `;
    }

})
.catch(error => alert("Erreur : " + error));

 /************************************************ */
 