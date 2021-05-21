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