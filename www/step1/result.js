/****************
 * 診断結果ページで使うJavaScript
 ****************/

/**
 * 診断結果ページで最初に呼ばれる処理
 */
let startR = () => {
	//今までの回答から、診断結果を取得
	let result = ars.getResult();

	// 診断結果を表示する
	showResult(result);
};


/**
 * 診断結果を表示する処理
 * @param result 診断結果
 */

let showResult = (result) => {
	// 診断結果の見出し
	let state = '';

	// 診断結果の画像
	let image = '';

	// 診断結果の説明文
	let detail = '';

	//結果が1だった場合
	if(result == 1){
		state = '診断結果1の見出し';
		image = 'img/sample/r1.jpg';
		detail = '診断結果1の説明文がここに入ります';

	}
	//結果が2だった場合
	else if(result == 2){
		state = '診断結果2の見出し';
		image = 'img/sample/r2.jpg';
		detail = '診断結果2の説明文がここに入ります';
	}
	//結果が3だった場合
	else if(result == 3){
		state = '診断結果3の見出し';
		image = 'img/sample/r3.jpg';
		detail = '診断結果3の説明文がここに入ります';
	}
	//結果が4だった場合
	else if(result == 4){
		state = '診断結果4の見出し';
		image = 'img/sample/r4.jpg';
		detail = '診断結果4の説明文がここに入ります';
	}

	//結果を画面に表示する

	// 診断結果の見出しを表示
	ars.resultState(state);

	// 診断結果の画像を表示
	ars.resultImage(image);

	// 診断結果の詳細を表示
	ars.resultDetail(detail);

	// //結果を画面に表示する
	// ars.showResult(state, image, detail);
};