var barDisplay = true;
var call1 = true;
function showSidebar() {
    const sbar = document.querySelector(".nav ul");
    if (sbar.style.display == "none")
        barDisplay = true;
    if (barDisplay) {
        sbar.style.display = "block";
        barDisplay = false;
    } else {
        sbar.style.display = "none";
        barDisplay = true;
    }
}



const slides = document.querySelectorAll(".slides");
var count = 0;
slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`;

    }
)
const n = slides.length;
const slideImage = () => {
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${count * 100}%)`;
        }
    )
}
const goPrev = () => {
    count = Math.abs((count - 1) % n);
    slideImage();
}
const goNext = () => {
    count = (count + 1) % n;
    slideImage();
}

let nam,email,phone, pass1, pass2;

function store() {
    nam = document.getElementById("name1").value;
    email = document.getElementById("email1").value;
    phone = document.getElementById("phone1").value;
    window.open("PWcreate.html");
}

function passcheck(){
    pass1 = document.getElementById("pas1").value;
    pass2 = document.getElementById("pas2").value;
    if(pass1 != pass2){
        window.alert("Please Confirm the Same Password");
    }
}