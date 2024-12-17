

let links = document.querySelectorAll('.collapse .nav-item a');
let list = document.querySelector('#navbarSupportedContent');
let listOfLinks = document.querySelectorAll('#navbarSupportedContent a');

let firstDay = document.querySelector('.row #firstDay');
let secondDay = document.querySelector('.row #secondDay');
let therdDay = document.querySelector('.row #therdDay');
let month = document.querySelector('.row #month');
let country = document.querySelector('.row #country');
let maxTemp = document.querySelectorAll('.row #maxTemp');
let minTemp = document.querySelectorAll('.row #minTemp');
let getIcon = document.querySelectorAll('.row #getIcon');
let condition = document.querySelectorAll('.row #condition');
let windKph = document.querySelector('.row #windKph');
let rainChance = document.querySelector('.row #rainChance');
let windDir = document.querySelector('.row #windDir');
let search = document.getElementById('search');

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
// 
function removListOfLinks() {
    list.classList.remove('show');
}

document.addEventListener('click', removListOfLinks)

for (let k = 0; k < listOfLinks.length; k++) {
    listOfLinks[k].addEventListener('click', removListOfLinks);
}

let changeActive = (j) => {
    for (let i = 0; i < links.length; i++) {
        if (links[i].classList.contains('active')) {
            links[i].classList.remove('active');
        }
    }
    links[j].classList.add('active');
}

for (let j = 0; j < links.length; j++) {
    links[j].addEventListener('click', function () {
        changeActive(j)
    })
}
// 

let data;


    navigator.geolocation.getCurrentPosition( async (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            if(lat !== undefined && lon !== undefined){
                let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ec7a71d7e464e30972122501241512&q=${lat},${lon}&days=3`);
                data = await response.json();
                getAllDdata()
            }else{
                async function viewData() {
                    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4ec7a71d7e464e30972122501241512&q=cairo&days=3`);
                    data = await response.json();
                    getAllDdata()
                }
                viewData()
                // 'you need to remove this alert'
                alert('Error determining your location. Please search for your location through the search bar');
            }
        })

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
}


// 



// function searchme() {
//     let onSearch = search.value;
//     console.log(onSearch);
// }

// search.addEventListener('keyup', searchme);



// 


// القاهرة (Cairo)
// لندن (London)
// نيويورك (New York)
// باريس (Paris)
// طوكيو (Tokyo)
// برلين (Berlin)
// موسكو (Moscow)
// روما (Rome)
// دبي (Dubai)
// إسطنبول (Istanbul)
// سنغافورة (Singapore)
// مدريد (Madrid)
// مومباي (Mumbai)
// تورونتو (Toronto)
// بكين (Beijing)
// كيب تاون (Cape Town)
// بوينس آيرس (Buenos Aires)
// شيكاغو (Chicago)
// سيدني (Sydney)
// ريو دي جانيرو (Rio de Janeiro)