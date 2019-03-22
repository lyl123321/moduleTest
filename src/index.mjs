import {imgCenter} from './imgCenter.mjs';
import Dialog from './Dialog.mjs';

const wrap = document.getElementsByClassName('img-center');
imgCenter(wrap, 'wspectFill');

const config = {
	title: '友情提示',
	content: '外面空气不太好，你确定你要出门逛逛吗？'
};

$('button.aspect').on('click', function() {
	window.addEventListener('wheel', noWheel);
	Dialog(config).show().then(() => console.log('你点击了确认按钮'), () => console.log('你点击了取消按钮'))
	.finally(() => window.removeEventListener('wheel', noWheel));
});

function noWheel(e) {
	e.cancelBubble ? e.stopPropagation() : false;
	e.preventDefault ? e.preventDefault() : false;
}