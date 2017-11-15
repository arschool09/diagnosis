/****************
 * 診断結果ページで使うJavaScript
 ****************/

/**
 * 診断結果ページで最初に呼ばれる処理
 */
let initR = () => {
	// 診断結果を表示する
	showResult();
};


/**
 * 診断結果を表示する処理
 */
let showResult = () => {
	//今までの回答から、診断結果を取得
	let result = ars.getUrlVars('r');
	let title, image, text;

	//結果が1だった場合
	if(result == '1'){
		title = 'あなたのタイプは西武線です！';
		image = 'img/sample/result1.jpg';
		text = '池袋や新宿から、秩父までいける西武線は、黄色い電車や青い電車があります。';

	}
	//結果が2だった場合
	else if(result == '2'){
		title = 'あなたのタイプは新幹線です！';
		image = 'img/sample/result2.jpg';
		text = '日本で一番速い電車、新幹線はみんなの人気者です！';
	}
	//結果が3だった場合
	else if(result == '3'){
		title = 'あなたのタイプは箱根登山鉄道です！';
		image = 'img/sample/result3.jpg';
		text = 'あじさいの中を走り抜け、スイッチバックも見ものです。';
	}
	else if(result == '4'){
		title = 'あなたのタイプは東北本線です！';
		image = 'img/sample/result4.jpg';
		text = '寒い冬でも地道にお客様を運ぶ、働き者の電車です！';
	}

	//結果を画面に表示する
	ars.showResult(title, image, text);
};
