$(document).ready(function() {
	$('.js-slider').slick({
		infinite: true,
	  slidesToShow: 4,
	  slidesToScroll: 1,
	  responsive: [
	     {
	       breakpoint: 991,
	       settings: {
	         slidesToShow: 3,
	       }
	     },
	     {
	       breakpoint: 767,
	       settings: {
	         slidesToShow: 2,
	       }
	     },
	     {
	       breakpoint: 580,
	       settings: {
	         slidesToShow: 1,
	       }
	     }
	   ]
	});
	var $grid = $('.grid').imagesLoaded( function() {
	  // init Masonry after all images have loaded
	  $('.masonry').css('opacity', '1');
	  $grid.masonry({
	    itemSelector: '.grid-item',
	    columnWidth: '.grid-sizer',
	  });
	});

	// var $grid = $('.grid').masonry({
	//   // options... 
	//   itemSelector: '.grid-item',
	//   columnWidth: '.grid-sizer',
	// });

	// // layout Masonry after each image loads
	// $grid.imagesLoaded().progress( function() {
	//   $grid.masonry('layout');
	// });
});
