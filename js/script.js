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

document.addEventListener("DOMContentLoaded", function () {
    // Simulate content loading time with a timeout
    setTimeout(function () {
        document.getElementById('skeleton-loader').classList.add('hidden');
        document.getElementById('contents').classList.remove('hidden');
    }, 4200); // 3 seconds loading time
});

// Panggil fungsi resizeImage saat halaman dimuat
window.onload = resizeImage;

// Panggil fungsi resizeImage setiap kali ukuran jendela berubah
window.onresize = resizeImage;

//menu navbar
var phoneNumbers = "6281316206746"; // Ganti dengan nomor tujuan yang sesuai

const jasa = "Saya ingin bertanya tentang jasa pembuatan Law Firm"
const textMenu = `https://api.whatsapp.com/send?phone=${phoneNumbers}&text=${encodeURIComponent(jasa)}`
const menuItems = [
    { href: "index.html", text: "Beranda" },
    { href: "about-us.html", text: "Tentang" },
    { href: "services.html", text: "Layanan" },
    { href: "news.html", text: "Berita" },
    // { href: "portfolio.html", text: "Berita" },
    { href: "contact-us.html", text: "Kontak" },
    { href: "https://app.peradinusantara.org/", text: "Daftar", target: "_blank" },
    // { href: textMenu, text: "Jasa Pembuatan Law Firm", target: "_blank" }
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
// var whatsappContainer = document.querySelector('.whatsapp-container');
// var whatsappText = document.querySelector('.whatsapp-text');

// // Add click event listener to toggle visibility
// whatsappContainer.addEventListener('click', function () {
//     if (whatsappText.style.display === 'block') {
//         whatsappText.style.display = 'none';
//     } else {
//         whatsappText.style.display = 'block';
//     }
// });

function jsonToText(json) {
    return `Halo! Saya ingin mendaftar ke kelas berikut biodata saya:\n\n` +
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
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
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

// Tangkap input dan tambahkan event listener untuk mendeteksi perubahan teks
document.getElementById('searchInput').addEventListener('input', function () {
    searchNews(); // Panggil fungsi pencarian saat teks berubah
});

const news = [
    {
        title:"Sebanyak 40 Orang Advokat Dilantik oleh Pengadilan Tinggi Bali", 
        desc:"Denpasar Bali, – MATA Menjadi advokat profesional dan berintegritas DPD Peradi Nusantara ( Persaudaraan Advokatindo Nusantara ) BALI di bawah kepemimpinan Ronald Samuel Wuisan, SH., SE., MH., MM yang berlangsung di Pengadilan Tinggi Bali Denpasar , Senin (21/10/24).",
        src:"https://mediaadipatinusantara.online/P/2024/10/21/sebanyak-40-orang-advokat-dilantik-oleh-pengadilan-tinggi-bali/", 
        editor:"Media Adipati",
        category:"Web", 
        date:"21 OKT 2024",
    },
    {
        title:"Sosialisasi Ketum DPP Peradi Nusantara Menjelang Pelantikan Advokat", 
        desc:"Bali Kuta Utara(MATA)-Minggu 20 Oktober 2024 Canggu Bali, setelah nobar pelantikan RI.1 & RI.2 Mr Ronald Ketua Umum DPP Peradi Nusantara mengajak para calon advokat didikannya untuk menjadi advokat yang profesional dan berintegritas, upaya tersebut disampaikan dalam sambutannya sebagai referensi menjadi seorang advokat berdedikasi tinggi menolong masyarakat yang membutuhkan bantuan hukum dengan setulus hati.",
        src:"https://mediaadipatinusantara.online/P/2024/10/20/sosialisasi-ketum-dpp-peradi-nusantara-menjelang-pelantikan-advokat/", 
        editor:"Media Adipati",
        category:"Web", 
        date:"20 OKT 2024",
    },  
    {
        title:"Peradi Nusantara Mengadakan PKΡΑ UPA dan Brevet AB Angkatan ke-9 dengan Menghadirkan Eks Wakapolri", 
        desc:"Jejakinformasi.id. Jakarta Peradi Nusantara mengadakan Pendidikan Khusus Profesi Advokat. Ujian Profesi Advokat dan Brevet AB (Profesi Kuasa Hukum Pajak) yang sebelumnya pada Hari Pertama untuk sesi pembukaan pada pukul 16:00-18:00 Wib yang disampaikan oleh Ketua Umum Peradi Nusantara Ronald Samuel Wuisan.",
        src:"https://www.jejakinformasi.id/2024/07/peradi-nusantara-mengadakan-pkpa-upa.html", 
        editor:"Jejak Informasi",
        category:"Web", 
        date:"14 OKT 2024",
    },    
    {
        title:"Wow Peradi Nusantara Luar biasa!! 112 Peserta PKPA UPA Brevet AB di nyatakan lulus dengan nilai yang sangat memuaskan, yaitu A+.", 
        desc:"Berantas.co.id, – Ketika di temui di Kantor APL Tower, Ketum Peradi Nusantara Ronald Samuel Wuisan mengatakan bersyukur para peserta 99% Lulus dan bangga kepada para peserta yang ikut. Itu artinya mereka memperhatikan materi yang di sampaikan oleh Para Profesor yang mengajar. Pengajar kami mulai dari Prof OC Kaligis (Advokat Senior dan Dosen), Prof Amad Sudiro, (Rektor UNTAR) Prof Ariawan Gunadi, ( Ketua Yayasan UNTAR/Ahli PHI & Perdagangan & Bisnis), Prof Anshari Ritonga (Ex Dirjen Pajak), Prof BF Sihombing (Ahli Agraria), Komjen Pol (P) Oegroseno (Ex Wakapolri), Ariawan Rahmat, BKP (Konsultan Pajak/Advokat/SekJen Peradi Pajak Nusantara), Irwan BKP (Waketum Peradi Pajak Nusantara/Advokat/konsultan pajak) dan masih banyak lagi.",
        src:"https://www.berantas.co.id/wow-peradi-nusantara-luar-biasa-112-peserta-pkpa-upa-brevet-ab-di-nyatakan-lulus-dengan-nilai-yang-sangat-memuaskan-yaitu-a/", 
        editor:"Berantas",
        category:"Web", 
        date:"14 OKT 2024",
    }, 
    {
        title:"Wow Peradi Nusantara Luar biasa!! 112 Peserta PKPA UPA Brevet AB di nyatakan lulus dengan nilai yang sangat memuaskan, yaitu A+.", 
        desc:"Metrokitanews.com, -Ketika di temui di Kantor APL Tower, Ketum Peradi Nusantara Ronald Samuel Wuisan mengatakan bersyukur para peserta 99% Lulus dan bangga kepada para peserta yang ikut. Itu artinya mereka memperhatikan materi yang di sampaikan oleh Para Profesor yang mengajar.",
        src:"https://metrokitanews.com/2024/07/18/wow-peradi-nusantara-luar-biasa-112-peserta-pkpa-upa-brevet-ab-di-nyatakan-lulus-dengan-nilai-yang-sangat-memuaskan-yaitu-a/", 
        editor:"Metro Kita News",
        category:"Web", 
        date:"18 JUL 2024",
    },  
    {
        title:"Peradi Nusantara", 
        desc:"Selamat datang di Peradi Nusantara! Jadi bagian dari komunitas hukum terdepan kami dan tingkatkan karier Anda melalui Program PKPA & UPA. Daftarlah sekarang dan sambut masa depan yang penuh prestasi dalam profesi hukum!.",
        src:"https://www.instagram.com/reel/C6iKs17Sm72/?utm_source=ig_embed&amp;utm_campaign=loading", 
        editor:"Instagram",
        category:"Instagram", 
        date:"4 MEI 2024",
    },
    {
        title:"Rasyid", 
        desc:"Testimoni kesen2 mengikuti ujian PKPA UPA + Brevet Pajak di Peradi Nusantata.",
        src:"https://www.instagram.com/reel/C_4Wx84Sd30/?utm_source=ig_embed&amp;utm_campaign=loading", 
        editor:"Instagram",
        category:"Instagram", 
        date:"14 SPT 2024",
    }, 
    {
        title:"Asri Koko", 
        desc:"Testimoni mengikuti program pendidikan yang diadakan @peradinusantara.id",
        src:"https://www.instagram.com/reel/C_2JYelSOCU/?utm_source=ig_embed&amp;utm_campaign=loading", 
        editor:"Instagram",
        category:"Instagram", 
        date:"13 SPT 2024",
    },
    {
        title:"Hanggoro Bayu", 
        desc:"Testimoni mengikuti kelas dan ujian pendidikan advokat angkatan 10 di Peradi Nusantata.",
        src:"https://www.instagram.com/reel/C_0Tg0WSzMz/?utm_source=ig_embed&amp;utm_campaign=loading", 
        editor:"Instagram",
        category:"Instagram", 
        date:"12 SPT 2024",
    },
    {
        title:"Zikril", 
        desc:"Testimoni mengikuti kelas dan ujian PKPA + UPA angkatan 9 di Peradi Nusantata.",
        src:"https://www.instagram.com/reel/C_Q09P9S79D/?utm_source=ig_embed&amp;utm_campaign=loading", 
        editor:"Instagram",
        category:"Instagram", 
        date:"30 AGS 2024",
    },
    {
        title:"Relinda Putri", 
        desc:"Testimoni peserta PKPA dan UPA angkatan 9 PERADI NUSANTARA.",
        src:"https://www.instagram.com/reel/C9y7rxpy1VU/?utm_source=ig_embed&amp;utm_campaign=loading", 
        editor:"Instagram",
        category:"Instagram", 
        date:"24 JUL 2024",
    },      
]

// Inisialisasi variabel global untuk pagination
let currentPage = 1;
const itemsPerPage = 2;
let selectedCategory = '';

// Fungsi untuk menampilkan berita dengan pagination
function displayNewsWithPagination(newsArray) {
    const newsContainer = document.getElementById('list-news');
    newsContainer.innerHTML = ''; // Kosongkan kontainer sebelum render

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedNews = newsArray.slice(startIndex, endIndex);

    // Render berita pada halaman saat ini
    paginatedNews.forEach(item => {
        const newsHTML = `
            <div class="row mb-4">
                <div class="col-sm-2 text-center">
                    <div class="entry-meta"> 
                        <span style="color:#06286A" id="publish_date">${item.date}</span>
                        <span><i class="fa fa-user"></i> <a>${item.editor}</a></span>                                   
                    </div>
                </div>
                <div class="col-sm-10 blog-content">
                    <a href="${item.src}" target="_blank">
                        <img class="img-responsive img-blog" src="images/blog/blog2.jpg" width="100%" alt="" />
                    </a>
                    <h2>
                        <a target="_blank" style="color:#06286A" href="${item.src}">${item.title}</a>
                    </h2>
                    <h3>${item.desc}</h3>
                    <a class="btn btn-primary readmore" style="color:black" href="${item.src}" target="_blank">
                        Lihat Selengkapnya <i class="fa fa-angle-right"></i>
                    </a>
                </div>
            </div>
        `;
        newsContainer.innerHTML += newsHTML;
    });

    renderPagination(newsArray.length); // Perbarui pagination
}

// Fungsi untuk memperbarui pagination
function renderPagination(totalItems) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Kosongkan pagination sebelum render

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Tombol Previous
    paginationContainer.innerHTML += `
        <li class="${currentPage === 1 ? 'disabled' : ''}">
            <a href="#" onclick="changePage(${currentPage - 1})"><i class="fa fa-long-arrow-left"></i> <span class="page-text">Previous Page</span></a>
        </li>
    `;

    // Nomor halaman
    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `
            <li class="${currentPage === i ? 'active' : ''}">
                <a href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    // Tombol Next
    paginationContainer.innerHTML += `
        <li class="${currentPage === totalPages ? 'disabled' : ''}">
            <a href="#" onclick="changePage(${currentPage + 1})"> <span class="page-text">Next Page</span>  <i class="fa fa-long-arrow-right"></i></a>
        </li>
    `;
}

// Fungsi untuk mengubah halaman
function changePage(page) {
    const totalPages = Math.ceil(news.length / itemsPerPage);

    if (page < 1 || page > totalPages) return; // Cegah halaman tidak valid
    currentPage = page; // Perbarui halaman saat ini
    searchNews(); // Render ulang berita berdasarkan halaman baru
}

// Fungsi pencarian berita
function searchNews() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();

    // Filter berita berdasarkan input dan kategori
    const matchedNews = news.filter(item =>
        item.title.toLowerCase().includes(searchInput) &&
        (selectedCategory === '' || item.category === selectedCategory)
    );

    if (matchedNews.length > 0) {
        displayNewsWithPagination(matchedNews);
    } else {
        document.getElementById('list-news').innerHTML = '<p>Berita tidak ditemukan!</p>';
        document.getElementById('pagination').innerHTML = ''; // Kosongkan pagination jika tidak ada hasil
    }
}

// Fungsi untuk menampilkan kategori dengan badge jumlah berita
function displayCategories() {
    const categoryList = document.getElementById('category-list');
    const categoryCounts = getCategoryCounts();

    Object.keys(categoryCounts).forEach(category => {
        const categoryHTML = `
            <li>
                <a href="#" id="category-${category}" onclick="filterByCategory('${category}')">
                    ${category} <span class="badge">${categoryCounts[category]}</span>
                </a>
            </li>
        `;
        categoryList.innerHTML += categoryHTML;
    });
}

// Fungsi untuk menghitung jumlah berita per kategori
function getCategoryCounts() {
    const counts = {};
    news.forEach(item => {
        counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
}

// Fungsi untuk memfilter berdasarkan kategori
function filterByCategory(category) {
    // selectedCategory = category;
    // currentPage = 1;
    // searchNews();
    const activeCategory = document.querySelector(`#category-${category}`); // Elemen kategori yang dipilih

    // Jika kategori yang dipilih sudah aktif, uncheck dan reset kategori
    if (activeCategory && activeCategory.classList.contains('active-category')) {
        activeCategory.classList.remove('active-category'); // Hapus class aktif
        selectedCategory = ''; // Reset kategori yang dipilih
    } else {
        // Hapus class aktif dari semua kategori
        const allCategories = document.querySelectorAll('.blog_category li a');
        allCategories.forEach(cat => cat.classList.remove('active-category'));

        // Tambahkan class aktif ke kategori yang dipilih
        if (activeCategory) activeCategory.classList.add('active-category');
        selectedCategory = category; // Set kategori yang dipilih
    }

    currentPage = 1; // Reset ke halaman pertama
    searchNews(); // Refresh pencarian dan tampilkan hasil berdasarkan kategori
}

// Tampilkan semua berita dan kategori saat halaman dimuat
window.onload = function () {
    displayNewsWithPagination(news);
    displayCategories();
};


function toggleWhatsappList() {
    var phoneNumbers = "628811809844"; // Ganti dengan nomor tujuan yang sesuai
    const jasa = "Halo! Saya ingin bertanya tentang Peradi Nusantara"

    const textMenu = `https://api.whatsapp.com/send?phone=${phoneNumbers}&text=${encodeURIComponent(jasa)}`
    window.open(textMenu, '_blank'); 
}


function sendMessage(number) {
    const message = encodeURIComponent('Hallo Saya ingin bertanya perihal peradi nusantara');
    const whatsappLink = `https://wa.me/${number}?text=${message}`;
    window.open(whatsappLink, '_blank');
}
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



