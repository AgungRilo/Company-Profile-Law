function resizeImage() {
    var image = document.getElementById('responsiveImage');

    if (window.innerWidth <= 768) { // Resolusi untuk mobile
        image.style.width = '90px';
        // titlename.style.color ='white';
        // titlename.style.fontSize='12px';
        // titlename.style.margin='0.8vh 0 2px 12px'
    } else { // Resolusi untuk web
        image.style.width = '120px';
        // titlename.style.color ='white';
        // titlename.style.fontSize='18px';

    }

}

// Panggil fungsi resizeImage saat halaman dimuat
window.onload = resizeImage;

// Panggil fungsi resizeImage setiap kali ukuran jendela berubah
window.onresize = resizeImage;

//menu navbar
var phoneNumbers = "628811809844"; // Ganti dengan nomor tujuan yang sesuai

const jasa = "Saya ingin bertanya tentang jasa pembuatan Law Firm"
const textMenu = `https://api.whatsapp.com/send?phone=${phoneNumbers}&text=${encodeURIComponent(jasa)}`
const menuItems = [
    { href: "index.html", text: "Beranda" },
    { href: "about-us.html", text: "Tentang" },
    { href: "services.html", text: "Layanan" },
    { href: "contact-us.html", text: "Kontak" },
    { href: "https://wuisanlawschool.net/", text: "Daftar", target: "_blank" },
    { href: textMenu, text: "Jasa Pembuatan Law Firm", target: "_blank" }
    // { href: "portfolio.html", text: "Portfolio" },
];

// Dapatkan URL halaman saat ini
const currentUrl = window.location.pathname;

// Dapatkan elemen ul dengan id "menu"
const menu = document.getElementById('menu');

// Looping melalui setiap item menu
menuItems.forEach(item => {
    // Buat elemen li baru
    const newLi = document.createElement('li');

    // Buat elemen anchor baru
    const newAnchor = document.createElement('a');

    // Set atribut href untuk anchor
    newAnchor.href = item.href;

    // Tambahkan teks ke dalam anchor
    newAnchor.textContent = item.text;

    // Cek jika ada target untuk anchor
    if (item.target) {
        newAnchor.target = item.target;
    }

    // Memeriksa apakah URL halaman saat ini cocok dengan href dari item menu
    // if (currentUrl.includes(item.href) ) {
    // 	newLi.classList.add('active'); // Menambahkan class 'active' ke elemen li
    // }

    if (currentUrl.includes(item.href) || (currentUrl === '/' && item.href === 'index.html')) {
        newLi.classList.add('active'); // Menambahkan class 'active' ke elemen li		
    }

    // Masukkan anchor ke dalam li
    newLi.appendChild(newAnchor);

    // Tambahkan elemen li baru ke dalam ul
    menu.appendChild(newLi);
});

// Get the elements
var whatsappContainer = document.querySelector('.whatsapp-container');
var whatsappText = document.querySelector('.whatsapp-text');

// Add click event listener to toggle visibility
whatsappContainer.addEventListener('click', function () {
    if (whatsappText.style.display === 'block') {
        whatsappText.style.display = 'none';
    } else {
        whatsappText.style.display = 'block';
    }
});

function jsonToText(json) {
    return `Saya ingin mendaftar ke kelas berikut biodata saya:\n\n` +
        `Nama: ${json.name}\n` +
        `Email: ${json.email}\n` +
        `Universitas: ${json.university}\n` +
        `Subjek: ${json.subject}\n` +
        `Pesan: ${json.message}\n`;
}
// Contact form
var form = $('#main-contact-form');	

var phoneNumber = "628811809844"; // Ganti dengan nomor tujuan yang sesuai

form.submit(function (event) {
    let data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        university: document.getElementById("university").value,
        subject:document.getElementById("subject").value,
        message:document.getElementById("message").value			
    }		
    event.preventDefault();

    const formattedText = jsonToText(data);
    const uriEncodedText = encodeURIComponent(formattedText);		

    // Nomor telepon tujuan di WhatsApp

    // URL WhatsApp API dengan teks terenkode
    var whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${uriEncodedText}`;

    // Redirect ke URL WhatsApp
    window.open(whatsappUrl, '_blank');
}	
);

var whatsappLink = document.getElementById('pak-handi');
var whatsappLink2 = document.getElementById('gabi');
var whatsappLink3 = document.getElementById('pak-ronald');
var whatsappLink4 = document.getElementById('bu-irene');

const phoneNumberHandi = "6287782000561"; // Ganti dengan nomor tujuan yang sesuai
const phoneNumberGabi = "628979941802"; // Ganti dengan nomor tujuan yang sesuai
const phoneNumberRonald = "628979941802"; // Ganti dengan nomor tujuan yang sesuai
const phoneNumberIrene = "628979941802"; // Ganti dengan nomor tujuan yang sesuai

const uriEncodedTextHandi = encodeURIComponent("Hallo Saya ingin bertanya perihal peradi nusantara");
const uriEncodedTextGabi = encodeURIComponent("Hallo Saya ingin bertanya perihal peradi nusantara");
const uriEncodedTextRonald = encodeURIComponent("Hallo Saya ingin bertanya perihal peradi nusantara");
const uriEncodedTextIrene = encodeURIComponent("Hallo Saya ingin bertanya perihal peradi nusantara");

// URL WhatsApp API dengan teks terenkode
whatsappLink.href = `https://api.whatsapp.com/send?phone=${phoneNumberHandi}&text=${uriEncodedTextHandi}`;
whatsappLink2.href = `https://api.whatsapp.com/send?phone=${phoneNumberGabi}&text=${uriEncodedTextGabi}`;
whatsappLink3.href = `https://api.whatsapp.com/send?phone=${phoneNumberRonald}&text=${uriEncodedTextRonald}`;
whatsappLink4.href = `https://api.whatsapp.com/send?phone=${phoneNumberIrene}&text=${uriEncodedTextIrene}`;


// Menginisialisasi index slide
let currentSlide = 0;

function showSlide(index) {
    const slides = document.getElementById('carousel-slide');
    const totalSlides = slides.children.length;

    // Menghitung slide aktif
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Menggeser slide
    slides.style.transform = 'translateX(' + (-currentSlide * 100) + '%)';
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Tampilkan slide pertama saat halaman dimuat
showSlide(currentSlide);



//Pretty Photo
$("a[rel^='prettyPhoto']").prettyPhoto({
    social_tools: false
});