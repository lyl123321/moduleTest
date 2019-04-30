function debounce(fn, delay) {
	let timer = null;
	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(() => fn.apply(this, args), delay);
	}
}

function throttle(fn, delay) {
	let run = true;
	return function(...args) {
		if(run) {
			run = false;
			fn.apply(this, args);
			setTimeout(() => run = true, delay);
		}
	}
}

export {debounce, throttle};