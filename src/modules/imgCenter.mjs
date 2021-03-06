import imgLoad from './imgLoad.mjs'

export default function imgCenter(domList, mode) {
	if(domList[Symbol.iterator] === undefined)
		domList = [domList];
	
	for(const item of domList) {
		if(!item || item instanceof Element === false) continue;
	
		const img = item.children[0],
			itemW = item.offsetWidth,
			itemH = item.offsetHeight,
			itemR = itemW / itemH;
		
		imgLoad(img).then(function() {
			const imgW = img.naturalWidth,
				imgH = img.naturalHeight,
				imgR = imgW / imgH;
			
			let resultMode;
			
			switch(mode) {
				case 'aspectFill':
					resultMode = imgR > 1 ? 'aspectFill-x' : 'aspectFill-y';
					break;
				case 'wspectFill':
					resultMode = itemR > imgR ? 'aspectFill-x' : 'aspectFill-y'
                    break;
                default:
                	break;
			}
			
			img.classList.add(resultMode);
		});
	}
}
