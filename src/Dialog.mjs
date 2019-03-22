let instance = null;

function Dialog({title = '这是标题', content = '这是提示内容'} = {}) {
	this.title = title;
	this.content = content;
	
	this.html = `<div class="dialog-dropback">\
            <div class="container">\
                <div class="head">${this.title}</div>\
                <div class="content">${this.content}</div>\
                <div class="footer">\
                    <button class="cancel">取消</button>\
                    <button class="confirm">确认</button>\
                </div>\
            </div>\
        </div>`;
}

Dialog.prototype = {
	constructor: Dialog,
	
	show() {
		instance == null ? true : this.destory();
		instance = this;
		
		$(this.html).appendTo(document.body);
		
		return new Promise((resolve, reject) => {
			$('.dialog-dropback .cancel').on('click', e => {
				this.destory();
				reject(e);
			});
			$('.dialog-dropback .confirm').on('click', e => {
				this.destory();
				resolve(e);
			});
		});
	},
	
	destory() {
		instance = null;
		$('.dialog-dropback .cancel').off('click');
		$('.dialog-dropback .confirm').off('click');
		$('.dialog-dropback').remove();
	}
}

export default function(config) {
	return new Dialog(config);
}
