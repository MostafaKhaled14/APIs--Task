

let links = document.querySelectorAll('.collapse .nav-item a');


let changeActive = (j) =>{
    for (let i = 0; i < links.length; i++) {
        if(links[i].classList.contains('active')){
            links[i].classList.remove('active');
        }
    }
    links[j].classList.add('active');
}

for (let j = 0; j < links.length; j++) {
    links[j].addEventListener('click', function(){
        changeActive(j)
    })
}

