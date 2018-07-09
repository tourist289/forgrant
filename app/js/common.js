$(document).ready(() => {

	// generate year array for birth`s selector options
	let now = new Date();
    innerOptions = '';

	for(let i = now.getFullYear(); i > 1900; i--){
		if(i != 1989) {
			innerOptions += `<option value="${i}"> ${i} </option>` ;
		} else {
			innerOptions += `<option value="${i}" selected> ${i} </option>` ;
		}
	}
	$('.js-years').html(innerOptions);
	$('.js-years').styler();




// trigger nav links
	$('.js-nav a').on('click', (e) => {
        $('.js-nav a').removeClass('active');
		e.currentTarget.classList.add('active');
	});




})