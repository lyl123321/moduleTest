export default function promiseTry(fn) {
	return new Promise((resolve, reject) => {
		resolve(fn());
	})
}
