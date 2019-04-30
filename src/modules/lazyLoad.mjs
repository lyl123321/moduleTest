import {debounce, throttle} from './debounce&throttle.mjs';
export default function lazyLoad(elems, {attr = 'data-url', container = window, callback} = {}) {
	if(elems[Symbol.iterator] === undefined)
		elems = [].slice.call(elems);
	
	const cache = [];
	for(const elem of elems) {
		if(!elem || elem instanceof Element === false) continue;
		const tag = elem.tagName.toLowerCase();
		const url = elem.getAttribute(attr);
		const data = {elem, tag, url};
		cache.push(data);
	}
	
	if(container !== window && container instanceof Element === false)
		container = window;
		
	const cb = function(el) {
		if(callback && typeof callback === 'function')
			callback.call(null, el);
	}
	
	function loading() {
		let contHeight, contTop;
		if(container === window) {
			contHeight = container.innerHeight;
			contTop = container.scrollY;
		} else {
			contHeight = container.clientHeight;
			contTop = container.scrollTop;
		}
		
		for(const data of cache) {
			let {elem, tag, url} = data;
			if(!elem || elem.style.display === "none" || elem.style.visibility === "hidden") continue;

			let high, low;
			//使用 offsetTop 时注意祖先元素的 CSS position 
			if(tag === 'img') {
				const pa = elem.parentElement;
				high = pa.offsetTop - contTop;
				low = high + pa.clientHeight;
			} else {
				high = elem.offsetTop - contTop;
				low = high + elem.clientHeight;
			}
			
			if((high >= 0 && high < contHeight) || (low > 0 && low <= contHeight)) {
				console.log(`0 <= ${high} < ${contHeight} ?,  0 < ${low} <= ${contHeight} ?`)
				if(url) {
					if(tag === 'img') {
						elem.setAttribute('src', url);
					} else if(window.jQuery) {
						jQuery(elem).load(url);
					}
				}
				
				cb(elem);
				data.elem = null;
			}
		}
	}

	loading();
	//container.addEventListener('scroll', loading);
	container.addEventListener('scroll', debounce(loading, 100));
	//container.addEventListener('scroll', throttle(loading, 100));
}
