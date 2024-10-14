jQuery(function ($) {
	// accordian
	$('.accordion-toggle').on('click', function () {
		$(this).closest('.panel-group').children().each(function () {
			$(this).find('>.panel-heading').removeClass('active');
		});

		$(this).closest('.panel-heading').toggleClass('active');
	});

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function () {
		'use strict';
		var $portfolio_selectors = $('.portfolio-filter >li>a');
		var $portfolio = $('.portfolio-items');
		$portfolio.isotope({
			itemSelector: '.portfolio-item',
			layoutMode: 'fitRows'
		});

		$portfolio_selectors.on('click', function () {
			$portfolio_selectors.removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$portfolio.isotope({ filter: selector });
			return false;
		});
	});		
	


	//Pretty Photo
	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false
	});
});

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
	{ href: "portfolio.html", text: "Portfolio" },
	{ href: "contact-us.html", text: "Kontak" },
	{ href: "https://wuisanlawschool.net/", text: "Daftar", target: "_blank" },
	// { href: textMenu , text: "Jasa Pembuatan Law Firm", target: "_blank" }
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

//fungsi search berita
document.getElementById('searchForm').addEventListener('submit', function(event) {
	event.preventDefault(); // Mencegah halaman reload	
  
	searchNews(); // Panggil fungsi pencarian
  });
  
  function searchNews() {	
	const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();	
  
	const iframe = document.getElementById('newsIframe1');
	const newsLinks = {
	  'peradi-nusantara-mengadakan-pkpa-upa': 'https://www.jejakinformasi.id/2024/07/peradi-nusantara-mengadakan-pkpa-upa.html',
	};
  
	if (newsLinks[searchInput]) {	  
	  iframe.src = newsLinks[searchInput]; // Ganti src iframe dengan link yang sesuai
	} else {	  
	  alert('Berita tidak ditemukan!');
	}
  }