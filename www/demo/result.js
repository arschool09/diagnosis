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
	let state = '';
	let image = '';
	let detail = '';

	//結果が1だった場合
	if(result == 1){
		state = 'あなたのタイプは新幹線です！';
		image = 'img/result1.jpg';
		detail = '新幹線タイプのあなたは、目的に向かって一直線！日本各地で見られる、大人も子供も大好きな人気者で、アイドルになれるでしょう。';
	}
	//結果が2だった場合
	else if(result == 2){
		state = 'あなたのタイプは西武線です！';
		image = 'img/result2.jpg';
		detail = '西武線タイプのあなたは、特急レッドアローから各駅停車まで、速さもデザインもさまざま。いろんなことにチャレンジするのが得意で、みんなを喜ばる料理人になれます。';

	}
	//結果が3だった場合
	else if(result == 3){
		state = 'あなたのタイプは箱根登山鉄道です！';
		image = 'img/result3.jpg';
		detail = '箱根登山鉄道タイプのあなたは、急な山道でもぐんぐん進む力強いタイプで、社長になってお金持ちになれます。困ってもスイッチバックして乗り越えられます。';
	}
	else if(result == 4){
		state = 'あなたのタイプは東北本線です！';
		image = 'img/result4.jpg';
		detail = '東北本線タイプのあなたは、寒い冬でも休まずずっと運行する、努力屋で、厳しい練習も楽しくできる、一流スポーツ選手になれます。';
	}

	//結果を画面に表示する

	// 診断結果の見出しを表示
	ars.resultState(state);

	// 診断結果の画像を表示
	ars.resultImage(image);

	// 診断結果の詳細を表示
	ars.resultDetail(detail);

	//結果を画面に表示する
	// ars.showResult(title, image, text);
};
