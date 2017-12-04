/****************
 * 診断結果ページで使うJavaScript
 ****************/

/**
 * 診断結果ページで最初に呼ばれる処理
 */
let kaisi = () => {
	//今までの回答から、診断結果を取得
	let kekka = ars.toruKekka();

	// 診断結果を表示する
	miseruKekka(kekka);
};


/**
 * 診断結果を表示する処理
 * @param kekka 診断結果
 */

let miseruKekka = (kekka) => {
	// 診断結果の見出し
	let midasi = '';

	// 診断結果の画像
	let gazo = '';

	// 診断結果の説明文
	let setumei = '';

	//結果が1だった場合
	if(kekka == 1){
		midasi = 'あなたのタイプは新幹線です！';
		gazo = 'img/kekka1.jpg';
		setumei = '新幹線タイプのあなたは、目的に向かって一直線！日本各地で見られる、大人も子供も大好きな人気者で、アイドルになれるでしょう。';
	}
	//結果が2だった場合
	else if(kekka == 2){
		midasi = 'あなたのタイプは西武線です！';
		gazo = 'img/kekka2.jpg';
		setumei = '西武線タイプのあなたは、特急レッドアローから各駅停車まで、速さもデザインもさまざま。いろんなことにチャレンジするのが得意で、みんなを喜ばる料理人になれます。';

	}
	//結果が3だった場合
	else if(kekka == 3){
		midasi = 'あなたのタイプは箱根登山鉄道です！';
		gazo = 'img/kekka3.jpg';
		setumei = '箱根登山鉄道タイプのあなたは、急な山道でもぐんぐん進む力強いタイプで、社長になってお金持ちになれます。困ってもスイッチバックして乗り越えられます。';
	}
	else if(kekka == 4){
		midasi = 'あなたのタイプは東北本線です！';
		gazo = 'img/kekka4.jpg';
		setumei = '東北本線タイプのあなたは、寒い冬でも休まずずっと運行する、努力屋で、厳しい練習も楽しくできる、一流スポーツ選手になれます。';
	}

	//結果を画面に表示する

	// 診断結果の見出しを表示
	ars.miseruMidasi(midasi);

	// 診断結果の画像を表示
	ars.miseruGazo(gazo);

	// 診断結果の詳細を表示
	ars.miseruSetumei(setumei);

};