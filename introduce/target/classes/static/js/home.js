/* =================================================

Template Name:  Escoby - vCard & Resume Template
Author: Beeskip
Version: 1.0

=================================================== */


$(function() {
	'use strict';

	/* Vars */

	var width = $(window).width();
	var height = $(window).height();

	/*---------------------- 
	   Preloader
	 ----------------------------*/
	$(window).on('load', function() {
		$(".loading").animate({
			"top" : "-100%"
		}, 700, function() {
			$(this).remove();
		});

	});

	/*---------------------- 
	   navigation bar
	 ----------------------------*/
	// 给点击项加class，移除其它项的class
	$(".top-menu ul li").click(function() {
		$(this).addClass("active").siblings('li').removeClass("active");
	});

	/*---------------------- 
	   about-section
	 ----------------------------*/
	$.ajax({
		url : REQUEST_URL.GETABOUT,
		type : 'post',
		async : false,
		success : function(data) {
			if (data.status == 0) {
				var list = data.result;
				$("#portrait").attr('src', list.image);
				$("#name").html(list.name);
				$("#profession").html(list.profession);
				$("#intro").html(list.intro);
			}
		},
	});

	/*---------------------- 
	   resume-section
	 ----------------------------*/
	$.ajax({
		url : REQUEST_URL.GETEXPERIENCE,
		type : 'post',
		async : false,
		success : function(data) {
			if (data.status == 0) {
				var experienceList = data.experience;
				var skillList = data.skill;
				for (var i = 0; i <= experienceList.length - 1; i++) {
					if (experienceList[i].type == 1) {
						$("#education").append("<div class='item'>" +
							"<div class='date'>" +
							"<span>" + experienceList[i].start_date + " - " + experienceList[i].end_date + "</span>" +
							"</div>" +
							"<div class='content'>" +
							"<h4>" + experienceList[i].content + "</h4>" +
							"<p>" + experienceList[i].address + "</p>" +
							"</div>" +
							"</div>");
					} else if (experienceList[i].type == 2) {
						$("#work").append("<div class='item'>" +
							"<div class='date'>" +
							"<span>" + experienceList[i].start_date + " - " + experienceList[i].end_date + "</span>" +
							"</div>" +
							"<div class='content'>" +
							"<h4>" + experienceList[i].content + "</h4>" +
							"<p>" + experienceList[i].address + "</p>" +
							"</div>" +
							"</div>");
					}
				}
				for (var i = 0; i <= skillList.length - 1; i++) {
					if (skillList[i].type == 1) {
						$("#personal-skill").append("<div class='skill-item'>" +
							"<h4 class='progress-title'>" + skillList[i].skill + "</h4>" +
							"<div class='progress'>" +
							"<div class='progress-bar' data-progress-value='" + skillList[i].percent + "' style='width: " + skillList[i].percent + "%;'>" +
							"<div class='progress-value'>" + skillList[i].percent + "%</div>" +
							"</div>" +
							"</div>" +
							"</div>");
					} else if (skillList[i].type == 2) {
						$("#professional-skill").append("<div class='skill-item'>" +
							"<h4 class='progress-title'>" + skillList[i].skill + "</h4>" +
							"<div class='progress'>" +
							"<div class='progress-bar' data-progress-value='" + skillList[i].percent + "' style='width: " + skillList[i].percent + "%;'>" +
							"<div class='progress-value'>" + skillList[i].percent + "%</div>" +
							"</div>" +
							"</div>" +
							"</div>");
					}
				}
			}
		},
	});


	/*---------------------- 
	   work section
	 ----------------------------*/

	$.ajax({
		url : REQUEST_URL.GETPROJECT,
		type : 'post',
		async : false,
		success : function(data) {
			if (data.status == 0) {
				var typeList = data.type;
				var projectList = data.project;
				for (var i = 0; i <= typeList.length - 1; i++) {
					$("#projectType").append("<button data-filter='." + typeList[i].type + "'>" + typeList[i].type + "</button>");
				}
				for (var i = 0; i <= projectList.length - 1; i++) {
					var project = "<div class='col-lg-4 col-md-6 grid-item " + projectList[i].type + "'>" +
						"<div class='single-works-section-item '>" +
						"<img src=" + projectList[i].image + " alt='work' class='img-fluid'>" +
						"<div class='overlay text-center'>" +
						"<div class='content'>" +
						"<h3>" + projectList[i].project + "</h3>" +
						"<p>" + projectList[i].description + "</p>";
					if (projectList[i].picture != null && projectList[i].picture != "") {
						project += "<a href=" + projectList[i].picture + " class='image-link'>" +
							"<span class='fa fa-eye'></span>" +
							"</a>";
					}
					if (projectList[i].download != null && projectList[i].download != "") {
						project += "<p></p>" +
							"<a href=" + projectList[i].download + " class=''><span class='fa fa-download'></span>" +
							"</a>";
					}
					project += "</div>" +
						"</div>" +
						"</div>" +
						"</div>";
					$("#project").append(project);
				}
			}
		},
	});

	$('#container').imagesLoaded(function() {
		// filter items on button click
		$('.filter-button-group').on('click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter : filterValue
			});
		});

		var $grid = $('.grid').isotope({
			// options options
			itemSelector : '.grid-item',
			layoutMode : 'fitRows'
		});
	// images have loaded
	});

	//Image Light Box Popup
	$('.image-link').magnificPopup({
		type : 'image'
	});


	/*---------------------- 
	   blog-section
	 ----------------------------*/

	$.ajax({
		url : REQUEST_URL.GETBLOG,
		type : 'post',
		async : false,
		success : function(data) {
			if (data.status == 0) {
				var list = data.result;
				for (var i = 0; i <= list.length - 1; i++) {
					var blog = "<div class='col-md-6 col-lg-4'>" +
						"<div class='box'>" +
						"<div class='image'>" +
						"<img src=" + list[i].image + " alt='blog post'> " +
						"<a href='" + list[i].url + "' target='_blank' class='tags'>" + list[i].tag + "</a>" +
						"</div>" +
						"<div class='text'>" +
						"<h3>" +
						"<a href='" + list[i].url + "' target='_blank'>" + list[i].title + "</a>" +
						"</h3>" +
						"<h4 class='blog-author'>By " + list[i].author + "</h4>" +
						"<h5 class='blog-date'>" + list[i].date + "</h5>" +
						"</div>" +
						"</div>" +
						"</div>";

					$("#blog").append(blog);
				}
			}
		},
	});

	/*---------------------- 
	   contacts-section
	 ----------------------------*/

	$("#submit").click(function() {
		if ($('#contact').val().trim() == "") {
			toastr.warning("请填写联系方式");
			return false;
		} else if ($('#message').val().trim() == "") {
			toastr.warning("请填写留言内容");
			return false;
		} else {
			var param = {
				"username" : $("#username").val(),
				"contact" : $("#contact").val(),
				"subject" : $("#subject").val(),
				"message" : $("#message").val()
			};
			$.ajax({
				url : REQUEST_URL.SUBMITOPINIONS,
				data : stringify(param),
				dataType : "json",
				contentType : "application/json",
				type : 'post',
				async : false,
				success : function(data) {
					if (data.status == 0) {
						toastr.success("提交成功", "SUCCESS");
						setTimeout(function() {
							window.location.reload();
						}, 2000);
					} else {
						toastr.error("提交失败", "FAIL");
					}
				},
			});
		}
	});


	/*---------------------- 
	   client carousel
	 ----------------------------*/

	$(".owl-carousel").owlCarousel({
		autoplay : true,
		loop : true,
		autoplayHoverPause : true,
		pagination : false,
		margin : 30,

		nav : false,
		items : 6,
		navElement : "span",
		navText : [ "<span class='fa fa-angle-left'></span>", "<span class='fa fa-angle-right'></span>" ],
		responsive : {
			0 : {
				items : 2
			},
			540 : {
				items : 3
			},
			767 : {
				items : 4
			},
			992 : {
				items : 5
			},
			1200 : {
				items : 6
			}
		}
	});

	/*---------------------- 
	  Counter Up Facts 
	----------------------------*/
	$('.counter').counterUp({
		delay : 10,
		time : 3000
	});


	/*---------------------- 
	   Typed subtitle
	 ----------------------------*/

	$('.typed-title').typed({
		stringsElement : $('.typing-title'),
		backDelay : 5000, /* Delay in text change */
		typeSpeed : 0, /* Typing speed */
		loop : true
	});


	/*---------------------- 
	   Menu mobile
	 ----------------------------*/

	$('.header').on('click', '.menu-btn', function() {
		if ($('.header').hasClass('opened')) {
			$('.header').removeClass('opened');
		} else {
			$('.header').addClass('opened');
		}
	});


	/*---------------------- 
	   Header Menu Desktop
	 ----------------------------*/

	if ($('#home-card').length) {
		$('.top-menu').on('click', 'a', function() {

			/* vars */
			var lines_grid = $('.lines-grid');
			var id = $(this).attr('href');
			var card_items = $('.card-inner');
			var card_item = $(id);
			var menu_items = $('.top-menu li');
			var menu_item = $(this).closest('li');

			if (!menu_item.hasClass('active') & $('#home-card').length) {

				/* close card items */
				menu_items.removeClass('active');
				lines_grid.removeClass('loaded');

				/* open card item */
				menu_item.addClass('active');
				setTimeout(function() {
					lines_grid.addClass('loaded');
					$(card_items).removeClass('active');
					$(card_item).addClass('active');
				}, 1000);
			}

			return false;
		});
	}

});