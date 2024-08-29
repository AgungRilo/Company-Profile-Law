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