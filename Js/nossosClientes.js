let slideIndex = 0;
let slides = document.getElementsByClassName("carousel-img");

let blurPrev = document.querySelector(".blur-prev");
let blurNext = document.querySelector(".blur-next");

showSlide(slideIndex);

// Atualiza imagem principal + borradas
function showSlide(n) {
    if (slides.length === 0) return;

    // Apaga todas as imagens (display e opacidade)
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = 0;    // <- necessário para o fade
    }

    slideIndex = (n + slides.length) % slides.length;

    // Mostra a imagem atual
    slides[slideIndex].style.display = "block";

    // Ativa o fade SUAVE
    setTimeout(() => {
        slides[slideIndex].style.opacity = 1;
    }, 10);

    // Define a imagem anterior borrada
    let prevIndex = (slideIndex - 1 + slides.length) % slides.length;
    blurPrev.style.backgroundImage = `url('${slides[prevIndex].src}')`;

    // Define a imagem próxima borrada
    let nextIndex = (slideIndex + 1) % slides.length;
    blurNext.style.backgroundImage = `url('${slides[nextIndex].src}')`;
}

// Botões
function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}


function toggleMenu() {
    const menu = document.getElementById("mobileMenu");

    if (menu.classList.contains("w3-hide")) {
        menu.classList.remove("w3-hide");
    } else {
        menu.classList.add("w3-hide");
    }
}