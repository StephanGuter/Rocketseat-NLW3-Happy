const options = {
    draggin: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// Get values form html
const lat = document.querySelector('span[data-lat]').dataset.lat;
const lng = document.querySelector('span[data-lng]').dataset.lng;

// Create map
const map = L.map('mapId', options).setView([lat, lng], 15);

// Create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2]
})

// Create and add marker

L.marker([lat, lng], { icon }).addTo(map);

/* Image Gallery */

function selectImage(event) {
    const button = event.currentTarget;

    // Remover todas as classes "active".

    function removeActiveClass(btn) {
        btn.classList.remove('active');
    }

    const buttons = document.querySelectorAll(".images button");
    buttons.forEach(removeActiveClass);

    // Adicionar a classe "active" para este botão.

    button.classList.add('active');

    // Selecionar imagem clicada.

    const image = button.children[0];
    const imageContainer = document.querySelector(".orphanage-details > img");

    // Atualizar o conteiner de imagem.

    imageContainer.src = image.src;
}