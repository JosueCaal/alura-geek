import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");
const btnLimpiar = document.querySelector("[data-boton-limpiar]");

function createCard(name, price, image, id){
    const card  = document.createElement("div");
   
    card.classList.add("card");

    card.innerHTML = `
    <img src="${image}" class="img-producto" />
     <div class="card-container--info">
        <p>${name}</p>
        <div class="card-container--value">
            <p>$ ${price}</p>
            <button class="delete-button" id="button-borrar" data-id="${id}">
                <img src="./assets/delete-producto.svg" />
            </button>
        </div>
    </div>
    `;  
    productContainer.appendChild(card);

        // Añadir event listener al botón de eliminación
        const deleteButton = card.querySelector(".delete-button");
        deleteButton.addEventListener("click", async () => {
            const productId = deleteButton.getAttribute("data-id");
            try {
                await servicesProducts.deleteProduct(productId);
                productContainer.removeChild(card); // Eliminar la tarjeta del DOM
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        });

    return card;
}



const render = async ()=>{
    try {
        const listProduct = await servicesProducts.productList();

        listProduct.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            );
        });

    } catch (error) {
        console.log(error)
    }
}

form.addEventListener("submit", (evento) =>{
    evento.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProduct(name,price,image).then((res) => console.log(res)).catch((err) => console.log(err))

});

btnLimpiar.addEventListener("click", ()=>{

    const name = document.querySelector("[data-name]").value = "";
    const price = document.querySelector("[data-price]").value = "";
    const image = document.querySelector("[data-image]").value = "";



})


render();