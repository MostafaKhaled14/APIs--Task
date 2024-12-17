let links = document.querySelectorAll('.collapse .nav-item a');
let list = document.querySelector('#navbarSupportedContent');
let listOfLinks = document.querySelectorAll('#navbarSupportedContent a');
let firstDay = document.querySelector('.row #firstDay');
let secondDay = document.querySelector('.row #secondDay');
let therdDay = document.querySelector('.row #therdDay');
let month = document.querySelector('.row #month');
let theDay = document.querySelector('.row #theDay');
let country = document.querySelector('.row #country');
let maxTemp = document.querySelectorAll('.row #maxTemp');
let minTemp = document.querySelectorAll('.row #minTemp');
let getIcon = document.querySelectorAll('.row #getIcon');
let condition = document.querySelectorAll('.row #condition');
let windKph = document.querySelector('.row #windKph');
let rainChance = document.querySelector('.row #rainChance');
let windDir = document.querySelector('.row #windDir');
let loadingScreen = document.querySelector('#loadingScreen');
let datalist = document.querySelector('#datalist');
let search = document.querySelector('main #search');
let values = document.getElementsByTagName('option');
let directionMap = {
    "N": "North",
    "NNE": "North",
    "NE": "North",
    "ENE": "North",
    "E": "East",
    "SE": "East",
    "SSE": "East",
    "S": "South",
    "SSW": "West",
    "SW": "West",
    "WSW": "West",
    "W": "West",
    "WNW": "West",
    "NW": "West",
    "NNW": "West"
}

let data;
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
        loadingScreen.classList.remove('d-none');
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ec7a71d7e464e30972122501241512&q=${lat},${lon}&days=3`);
        data = await response.json();
        getAllDdata()
        loadingScreen.classList.add('d-none');
    },
        function() {
            loadingScreen.classList.remove('d-none');
            alert(`" Allow your location to be displayed so I can view your weather data accurately or look it up yourself. "`);
            loadingScreen.classList.add('d-none');
        }
    );
} else {alert("Geolocation is not supported by this browser.");}

async function defaultData() {
    loadingScreen.classList.remove('d-none');
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ec7a71d7e464e30972122501241512&q=cairo&days=3`);
    data = await response.json();
    getAllDdata()
    loadingScreen.classList.add('d-none');
}

window.addEventListener('load', defaultData);

async function searchOnMe(){
    for (let i = 0; i < values.length; i++) {
        if(search.value.toLowerCase() === values[i].value.toLowerCase()){
            console.log(values[i].value);
            let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ec7a71d7e464e30972122501241512&q=${values[i].value}&days=3`);
            data = await response.json();
            getAllDdata()
            console.log(data);
            break;
        }
    }
}
search.addEventListener('keyup', searchOnMe)

function getAllDdata() {
    let newSrc;
    let dateANumber;
    for (let j = 0; j < maxTemp.length; j++) {
        dateANumber = data.forecast.forecastday[j].date;
        newSrc = data.forecast.forecastday[j].day.condition.icon;
        maxTemp[j].innerHTML = data.forecast.forecastday[j].day.maxtemp_c;
        minTemp[j].innerHTML = data.forecast.forecastday[j].day.mintemp_c;
        condition[j].innerHTML = data.forecast.forecastday[j].day.condition.text;
        getIcon[j].setAttribute('src', newSrc);
        getDayFromDate(dateANumber);
    }
    country.innerHTML = data.location.region;
    windKph.innerHTML = data.current.wind_kph;
    rainChance.innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain;
    windDir.innerHTML = directionMap[data.current.wind_dir];
    getMonthFromDate();
}

function getDayFromDate(dateANumber) {
    let date = new Date(dateANumber);
    let dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    if (dateANumber === data.forecast.forecastday[0].date) {
        firstDay.innerHTML = dayName;
    } else if (dateANumber === data.forecast.forecastday[1].date) {
        secondDay.innerHTML = dayName;
    } else {
        therdDay.innerHTML = dayName;
    }
}

function getMonthFromDate() {
    let date = new Date(data.forecast.forecastday[0].date);
    let monthName = date.toLocaleDateString("en-US", { month: "long" });
    month.innerHTML = monthName;
    theDay.innerHTML = data.forecast.forecastday[0].date.split('-').slice(-1)[0];
}

function viewList() {
    if (search.value === '') {
        datalist.innerHTML = '';
    }else {
        datalist.innerHTML = `<option value="Cairo"><option value="London">
        <option value="Paris"><option value="Tokyo"><option value="New York">
        <option value="Brasília"><option value="Moscow"><option value="Rome">
        <option value="Dubai"><option value="Madrid"><option value="Mumbai">
        <option value="Toronto"><option value="Beijing"><option value="Cape Town">
        <option value="Buenos Aires"><option value="Chicago"><option value="Sydney">
        <option value="Riyadh"><option value="Abu Dhabi"><option value="Kuwait City">
        <option value="Doha"><option value="Baghdad"><option value="Damascus">
        <option value="Beirut"><option value="Amman"><option value="Jerusalem">
        <option value="Washington D.C."><option value="Ottawa"><option value="Mexico City">
        <option value="Buenos Aires"><option value="Canberra"><option value="Seoul">
        <option value="New Delhi"><option value="Ankara"><option value="Bern">
        <option value="Vienna"><option value="Athens"><option value="Islamabad">
        <option value="Jakarta"><option value="Abuja"><option value="Nairobi">
        <option value="Al Jizah"><option value="Mansoura"><option value="Luxor">
        <option value="Aswan"><option value="Suez"><option value="Port Said">
        <option value="Minya"><option value="Sohag"><option value="Qena">
        <option value="Damietta"><option value="Faiyum"><option value="Beni Suef">
        <option value="Kafr El Sheikh"><option value="Sharm El Sheikh"><option value="Hurghada">
        <option value="Tanta"><option value="Zagazig"><option value="Damanhur">
        <option value="Asyut">`;
    }
}

search.addEventListener('keyup', viewList);

let changeActive = (j) => {
    for (let i = 0; i < links.length; i++) {
        if (links[i].classList.contains('active')) {
            links[i].classList.remove('active');
        }
    }
    links[j].classList.add('active');
}

function removListOfLinks() {
    list.classList.remove('show');
}

document.addEventListener('click', removListOfLinks);

for (let j = 0; j < links.length; j++) {
    listOfLinks[j].addEventListener('click', removListOfLinks);
    links[j].addEventListener('click', function () {
        changeActive(j)
    })
}