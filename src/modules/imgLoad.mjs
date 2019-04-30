export default function imgLoad(img) {
	return new Promise((resolve, reject) => {
		if(img.complete === true) {
			resolve();
		} else {
			img.onload = event => resolve(event);
			img.onerror = err => reject(err);
		}
	});
}
