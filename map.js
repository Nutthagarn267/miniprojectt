// สร้างแผนที่ด้วย Leaflet
var map = L.map('map').setView([13.736717, 100.523186], 5); // ศูนย์กลางเป็นกรุงเทพ

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var markers = L.layerGroup().addTo(map);

// รายการของจังหวัดในประเทศไทย
var provinces = [
    "เลือกจังหวัด",
    "Amnat Charoen",
    "Ang Thong",
    "Bueng Kan",
    "Buriram",
    "Chachoengsao",
    "Chai Nat",
    "Chaiyaphum",
    "Chanthaburi",
    "Chiang Mai",
    "Chiang Rai",
    "Chonburi",
    "Chumphon",
    "Kalasin",
    "Kamphaeng Phet",
    "Kanchanaburi",
    "Khon Kaen",
    "Krabi",
    "Lampang",
    "Lamphun",
    "Loei",
    "Lopburi",
    "Mae Hong Son",
    "Maha Sarakham",
    "Mukdahan",
    "Nakhon Nayok",
    "Nakhon Pathom",
    "Nakhon Phanom",
    "Nakhon Ratchasima",
    "Nakhon Sawan",
    "Nakhon Si Thammarat",
    "Nan",
    "Narathiwat",
    "Nong Bua Lamphu",
    "Nong Khai",
    "Nonthaburi",
    "Pathum Thani",
    "Pattani",
    "Pattaya",
    "Phang Nga",
    "Phatthalung",
    "Phayao",
    "Phetchabun",
    "Phetchaburi",
    "Phichit",
    "Phitsanulok",
    "Phra Nakhon Si Ayutthaya",
    "Phrae",
    "Phuket",
    "Prachinburi",
    "Prachuap Khiri Khan",
    "Ranong",
    "Ratchaburi",
    "Rayong",
    "Roi Et",
    "Sa Kaeo",
    "Sakon Nakhon",
    "Samut Prakan",
    "Samut Sakhon",
    "Samut Songkhram",
    "Saraburi",
    "Satun",
    "Sing Buri",
    "Sisaket",
    "Songkhla",
    "Sukhothai",
    "Suphan Buri",
    "Surat Thani",
    "Surin",
    "Tak",
    "Trang",
    "Trat",
    "Ubon Ratchathani",
    "Udon Thani",
    "Uthai Thani",
    "Uttaradit",
    "Yala",
    "Yasothon",
    "Bangkok"
];

// Fetch places when a province is selected
document.getElementById('provinceSelect').addEventListener('change', function() {
    fetchTomatoGardens(this.value);
});

// Populate the select with options
provinces.forEach(province => {
    var option = document.createElement('option');
    option.value = province;
    option.text = province;
    document.getElementById('provinceSelect').appendChild(option);
});

function fetchTomatoGardens(province) {
    // Check if the province is the default "Select a province" option
    if (province === "เลือกจังหวัด") {
        markers.clearLayers();
        return;
    }
    
    var apiKey = "AIzaSyDd0bPNSkl5k7QWU5reBeWeZ30Hb9OMBeg";
    var url = `http://49.231.43.88:3001/https://maps.googleapis.com/maps/api/place/textsearch/json?query=ไร่นา+${province}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Clear old markers
            markers.clearLayers();

            // Add new markers
            data.results.forEach(place => {
                L.marker([place.geometry.location.lat, place.geometry.location.lng])
                    .addTo(markers)
                    .bindPopup(`<b>${place.name}</b><br>${place.formatted_address}`);
            });
        })
        .catch(error => console.error(error));
}
