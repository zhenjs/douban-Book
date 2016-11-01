var v1 = null;
//浮动窗顶到浏览器边界不动
window.onscroll = function () {
	var fix = $('.search-items')[0];
	var $ul = $('.move')[0];
	if (document.body.scrollTop > 212) {
		$ul.style.position = 'fixed';
		$ul.style.top = '5px';
		fix.style.height = '1px';
		$ul.style.width = '65px';
	} else {
		$ul.style.position = 'static';
		fix.style.height = 'auto';
	}
}
//加载数据函数
let cb = (data) => {
	$('.result-list').remove();
	var $search_result = $('.search-result')[0];
	var datas = data.books;
	console.log(datas);
	var $div_wrap = $('<div class=result-list/>');
	datas.forEach(function (data, index) {
		var $h3 = $('<h3><span>[书籍]<span><a href="'+ data.alt +'">' + data.title+'</a></h3>');
		var $span = $('<span class="allstar"></span><span class="rating_num">' + data.rating.average + '</span><span>' + '(' + data.rating.numRaters + '评价)' + '</span><span class="subjuect_cast">' + data.author[0] + '/' + data.publisher + '/' + data.pubdate + '</span>');
		var $p = $('<p>"' + data.summary.slice(0, 100) + '...' + '"</p>');
		var $pic = $('<div class="pic"><a href="#" class="nbg"><img src="' + data.images.small + '"></a></div>');
		var $title = $('<div class="title"></div>');
		var $content = $('<div class="content"></div>');
		var $info = $('<div class="info"></div>');
		$info.append($span);
		$title.append($h3).append($info);
		$content.append($title).append($p);
		var $result = $('<div class="result"></div>');
		$result.append($pic).append($content).appendTo($div_wrap);
		$($search_result).append($div_wrap);

	})
	$('.result-list').append($('<div class="result_ft" >显示更多</div>'));

	//加载更多按钮点击事件，重新调用ajax函数，并且请求内容加10  
	$('.result_ft')[0].onclick = function () {
		v3 += 10;
		demo();

		//将上一次的加载更多按钮删除
		$('.result_ft').remove();
	}
}
//搜索按钮点击事件
$('#btn').on('click', () => {
	v3 = 10;
	demo();
})

//ajax函数
let demo = () => {
	var $inp = $('#inp');
	if ($inp.val()) {
		v1 = $inp.val();
		$.ajax({
		type: 'GET',
		dataType: 'jsonp',
		url: 'https://api.douban.com/v2/book/search',
		data: {
			q: v1,
			//请求开始位置
			start: 0,
			//请求数量
			count: v3
		},
		success: function(data) {
			// console.log(data);
			cb(data);
		},

		error: function() {
			console.log('error!!!');
		}
	})
	}
}