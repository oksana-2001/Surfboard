
function menuHamburger() {
	const buttonOpen = document.querySelector(".hamburger");
	const buttonClose = document.querySelector(".menu__close");
	const menu = document.querySelector(".menu");

	function closeMenu(element, className) {
		element.classList.remove(className)
	}
	function openMenu(element, className) {
		element.classList.add(className)
	}

	buttonOpen.addEventListener("click", function (event) {
		event.preventDefault();
		openMenu(menu, "menu-opened")
	})
	buttonClose.addEventListener("click", function (event) {
		event.preventDefault();
		openMenu(menu, "menu-opened")
	})

	menu.addEventListener("click", function (event) {
		const target = event.target;
		console.log(target);
		if (target.classList.contains("menu__link")) {
			closeMenu(menu, "menu-opened");
		}
	})

}
menuHamburger();


const openItem = (item) => {

	const container = item.closest(".team__item");
	const contentBlock = container.find(".team__content");
	const textBlock = contentBlock.find(".team__content-block");
    const reqHeight = textBlock.height();

	container.addClass('active');
	contentBlock.height(reqHeight);
}

const closeEveryItem = (container) => {
	const items = container.find(".team__content");
	const itemContainer = container.find(".team__item");

	itemContainer.removeClass('active');

	items.height(0);
};

$(".team__title").click((e) => {
	const $this = $(e.currentTarget);
	const container = $this.closest(".team");
	const elemContainer = $this.closest(".team__item");

	if (elemContainer.hasClass("active")) {
		closeEveryItem(container);
		
	} else {
		closeEveryItem(container);
		openItem($this);
	}


	
});


const slider = $('.products').bxSlider({
	pager: false,
	controls:false,
});

$('.products-slider__arrows--direction--prev').click((e) => {
	e.preventDefault();
	slider.goToPrevSlide();
});

$('.products-slider__arrows--direction--next').click((e) => {
	e.preventDefault();
	slider.goToNextSlide();
});



const validateFilds = (form, fieldsArray) => {
	fieldsArray	.forEach((field) => {
		field.removeClass("input-error");
		if (field.val().trim() === "") {
			field.addClass("input-error");
		}
	});

	const errorFields = form.find(".input-error");

	return errorFields.length === 0;
}

$(".form").submit((e) => {
	e.preventDefault();

	const form = $(e.currentTarget);
	const name = form.find("[name='name']");
	const phone = form.find("[name='phone']");
	const comment = form.find("[name='comment']");
	const to = form.find("[name='to']");

	const modal = $("#modal");
	const content = modal.find(".modal__content");

	modal.removeClass("error-modal");
	 
	const isValid = validateFilds(form, [name, phone, comment, to]);

	

	if (isValid) {
		 const request = $.ajax({
			url: "https://webdev-api.loftschool.com/sendmail",
			method: 'post',
			data: {
				name: name.val(),
				phone: phone.val(),
				comment: comment.val(),
				to: to.val(),
			},
			
			 error: data => { },
				
		 });
		
		request.done(data => {
			content.text(data.message);
			
		});

		request.fail((data) => {
			const message = data.responseJSON.message;
			content.text(message);
			modal.addClass("error-modal");
		});
		
		request.always(() => {
			$.fancybox.open({
				src: '#modal',
				type: 'inline',
			});
		})
	}
});

    $('.app-close-modal').click((e) => {
		e.preventDefault();

		$.fancybox.close();
	})




const findBlockByAlias = (alias) => {
	return $(".reviews__item").filter((ndx, item) => {
		return $(item).attr("data-linked-width") === alias;
	});
};
$(".reviews-switcher__link").click(e => {
	e.preventDefault();

	const $this = $(e.currentTarget);
	const target = $this.attr("data-open");
	const itemToShow = findBlockByAlias(target);
	const curItem = $this.closest(".reviews-switcher__item");


	itemToShow.addClass("active").siblings().removeClass("active");
	curItem.addClass("active").siblings().removeClass("active");
});


let myMap;

const init = () => {
	myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 10,
		controls: []
	});

	const coords = [
		[55.752004, 37.576133],
        [55.758640, 37.658958],
        [55.612111, 37.611895],
   
	];

		const myCollection = new ymaps.GeoObjectCollection({}, {
			draggable: false,
			iconLayout: 'default#image',
			iconImageHref: './img/label.svg',
			iconImageSize: [46, 57],
			iconImageOffset: [-35, -52]
		});

		coords.forEach(coord => {
			myCollection.add(new ymaps.Placemark(coord));
		  })

	myMap.geoObjects.add(myCollection);
	myMap.behaviors.disable('scrollZoom');

}

ymaps.ready(init);


const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");



let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
	const position = sectionEq * -100;

	if (isNaN(position)) {
		console.error("передаю не верное значение в contSectionPosition");
		return 0;
	}
    return position;
};

const changeMenuThemeForSection = (sectionEq) => {
	const currentSection = sections.eq(sectionEq);
	const menuTheme = currentSection.attr("data-sidemenu-theme");
	const activeClass = "fixed-menu--shadowed";

	if (menuTheme === "black") {
		sideMenu.addClass(activeClass);
	} else {
		sideMenu.removeClass(activeClass);
	}
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
	items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const performTransition = (sectionEq) => {
	if (inScroll) return;

	const transitionOver = 1000;
	const mouseInertiaOver = 300;

		inScroll = true;

		const position = countSectionPosition(sectionEq);

		changeMenuThemeForSection(sectionEq);
		
	    display.css({
		   transform: `translateY(${position}%)`,
		});

		resetActiveClassForItem(sections, sectionEq, "active");
	
	setTimeout(() => {
		inScroll = false;
		resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
       
	}, transitionOver + mouseInertiaOver);
	
};

const viewportScroller = () => {
	const activeSection = sections.filter(".active");
	const nextSection = activeSection.next();
	const prevSection = activeSection.prev();

	return {
		next() {
			if (nextSection.length) {
				performTransition(nextSection.index());
			}
		},
		prev() {
			if (prevSection.length) {
				performTransition(prevSection.index())
			}
		},
	};
};

$(window).on("wheel", (e) => {
	const deltaY = e.originalEvent.deltaY;
	const scroller = viewportScroller();

	if (deltaY > 0) {
		scroller.next();
	}

	if (deltaY < 0) {
		scroller.prev();
	}
});

$(window).on("keydown", e => {
	const tagName = e.target.tagName.toLowerCase();
	const userTypingInInputs = tagName === "input" || tagName === "textarea";
	const scroller = viewportScroller();

	if (userTypingInInputs) return;

		switch (e.keyCode) {
			case 38:
				scroller.prev();
				break;
			
			case 40:
				scroller.next();
				break;
		}
	
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click (e => {
 e.preventDefault();
	
 const $this = $(e.currentTarget);
 const target = $this.attr("data-scroll-to");
 const reqSection = $(`[data-section-id=${target}]`);

 performTransition(reqSection.index());
});



const verticalAcco3 = () => {
	const links = document.querySelectorAll(".overview-menu__trigger");
	const body = document.querySelector('body');
	const calculateWidth = () => {
		const windowWidth = window.innerWidth;
		
		const MAX_WIDTH = 524;

		const linksWidth = links[0].offsetWidth;

		const reqWidth = windowWidth - (linksWidth * links.length);

		return reqWidth > MAX_WIDTH ? MAX_WIDTH : reqWidth;
	};
	
	function closeItem(activeElement) {
		const activeText = activeElement.querySelector(".overview-menu__content");
		activeText.style.width = "0px";
		activeElement.classList.remove("active");
	}

	links.forEach(function (elem) {
		elem.addEventListener("click", function (e) {
			e.preventDefault();
			const link = e.target.closest(".overview-menu__trigger");
			const active = document.querySelector(".overview-menu__item.active");
			console.log(active)
			if (active) {
				closeItem(active);
			}

			if (!active || active.querySelector(".overview-menu__trigger") !== link) {
				const current = link.closest(".overview-menu__item");
				current.classList.add("active");
				const currentText = current.querySelector(".overview-menu__content");
				if (body.offsetWidth > 480) {
					currentText.style.width = calculateWidth() + 'px';

					widthEl = calculateWidth();

				} else {
					currentText.style.width = '100%';
				}
			}

		});
	});
}
verticalAcco3();