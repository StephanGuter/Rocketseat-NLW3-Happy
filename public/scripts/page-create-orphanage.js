// Create map
const map = L.map("mapId").setView([-23.9756388,-46.3182995], 15);

// Create and add tileLayer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68]
})

// Create and add marker
let marker;

map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // Remove icon

    marker && map.removeLayer(marker);

    // Add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map);
})

// Adicionar o campo de fotos

function addPhotoField() {
    //console.log('_m/');

    // Pegar o container de fotos #images
    const container = document.querySelector('#images');
    // Pegar o container filho para duplicar .new-images
    const fieldsContainer = document.querySelectorAll('.new-upload');
    // Realizar o clone da ultima imagem adicionada
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true);
    // Verificar se o campo está vazio. Se sim, não adicionar ao container de fotos #images
    const input = newFieldContainer.children[0];

    if (input.value != "")
    {
        // Limpar o campo clonado antes de adicionar ao container de fotos #images
        input.value = "";
        // Adicionar o clone ao container de fotos #images
        container.appendChild(newFieldContainer);
    }
}

// Deletar campo de foto

function deleteField(event) {
    const span = event.currentTarget;

    const fieldsContainer = document.querySelectorAll('.new-upload');

    if (fieldsContainer.length > 1) {
        span.parentNode.remove();
    } else {
        span.parentNode.children[0].value = "";
    }
}

// Alternar botão selecionado

function toggleSelect(event) {
    // Retirar a classe .active dos dois botões
    document.querySelectorAll('.button-select button')
    .forEach(button => button.classList.remove('active'));
    // Colocar a classe .active no botão clicado
    const button = event.currentTarget;
    button.classList.add('active');
    // Atualizar o input hidden com o valor correspondente ao selecionado
    const input = document.querySelector('[name="open_on_weekends"]');
    input.value = button.dataset.value;
}

function validate(event) {
    //event.preventDefault();

    // Validar os campos do formulário (inclusive lat, lng).
}