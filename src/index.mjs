import imgCenter from './modules/imgCenter.mjs';
import Dialog from './modules/Dialog.mjs';
import lazyLoad from './modules/lazyLoad.mjs';

//控制图片大小
function center(elem) {
	if(elem.tagName.toLowerCase() === 'img') {
		imgCenter(elem.parentElement, 'wspectFill');
	}
}

//设置弹窗
const config = {
	title: '友情提示',
	content: '外面空气不太好，你确定你要出门逛逛吗？'
};

$('button.aspect').on('click', function() {
	window.addEventListener('wheel', noWheel, {
		capture: false,
		passive: false
	});
	Dialog(config).show()
	.then(() => console.log('你点击了确认按钮'), () => console.log('你点击了取消按钮'))
	.finally(() => window.removeEventListener('wheel', noWheel));
});

function noWheel(e) {
	e.cancelBubble ? e.stopPropagation() : false;
	e.preventDefault ? e.preventDefault() : false;
}

//图片懒加载
lazyLoad(document.getElementsByClassName('lazy'), {callback: center});