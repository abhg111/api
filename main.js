const inputCp = document.querySelector(".cp")
const selctVille = document.querySelector(".ville")
// Initial map view
var map = L.map('map').setView([51.505, -0.09], 13);
var marker = L.marker([51.5, -0.09]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am .....").openPopup();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let villesData = [];

// Récupérer le nom et les cordinations d'une ville

inputCp.addEventListener("input", () =>{

    let value = inputCp.value

    selctVille.innerHTML = "<option value=''>Choisissez une ville</option>";

    fetch(`https://geo.api.gouv.fr/communes?codePostal=${value}&fields=region,nom,code,centre&format=json`)
    
    .then ((reponse) => reponse.json())
    .then ((data) => {

        villesData = data;

        // Afficher data récupérées

         console.log(data)

        // Récuperer le nom et le code de la ville

        data.forEach((ville) => {

            let option = document.createElement("option")

            option.value =`${ville.code}`
            option.innerHTML = `${ville.nom}`
            selctVille.appendChild(option)
             
          
        })
    })



})

// Changer la vue de chacune ville selectionnée

selctVille.addEventListener("change", () => {
    let villeCode = selctVille.value;
    let villeSelected = villesData.find(ville => ville.code === villeCode);

    if (villeSelected && villeSelected.centre && villeSelected.centre.coordinates) {
        const [lng, lat] = villeSelected.centre.coordinates; 
        console.log("Coordinates selected :", lat, lng); 

        marker.setLatLng([lat, lng]);
        // Positionner le marker aprés avoir longitude et latitude
        map.setView([lat, lng], 13);   

        console.log("Put marker in :", [lat, lng]);
        // Si y'a pas la longitude et latitude envoie "Error"
    } else {
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error.");
        console.log("Error."); 
        console.log("Error."); 
    }
});
