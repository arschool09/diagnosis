/****************
 * 質問ページで使うJavaScript
 ****************/

/**
 * 質問のページで最初に呼ばれる関数
 * - 質問1を表示する
 */
let kaisi = () => {
	// アプリのタイトルを設定する
	ars.taitoru('ArSchoolで電車診断');

	// 質問1を表示する
	miseruQ1();
};


/**
 * 質問1 を表示する
 * 文章で選択する質問
 */
let miseruQ1 = () => {
	// 質問を始めるときは new Situmon(?)する
	// 引数(?)は、質問の番号（質問1なので1をセット）
	let q = new Situmon(1);

	// 質問文
	q.bun('あなたが小学校から塾に通うとします。そのときに乗るとしたら、どの通勤電車に乗りたいですか？');

	// 選択肢が文章の場合はt, 画像の場合はiをセット
	q.syurui('t');

	// 選択肢を追加していく
	q.sentakusi('やっぱり、ぐるぐる回って楽しい山手線！');
	q.sentakusi('まっすぐ東西に伸びる、中野も通る中央線！');
	q.sentakusi('池袋から新宿まで、ぐるっと遠回りの丸ノ内線！');
	q.sentakusi('混んでるけどぐんぐん飛ばす湘南新宿ライン！');

};


/**
 * 全質問が終わり、診断結果ページへ移動する
 */
let miseruSindan = () => {
	// 診断結果を取得（診断結果が何番か）
	let kekka = keisan();

	// ページを移動する
	location.href = "result.html?r="+kekka;
};


/**
 * 質問で選択肢を選んだときの処理
 * @param bangou 答えた質問番号（何問目か）
 */
let eranda = (bangou) => {
	// 1問目に答えたら
	if(bangou == 1){
		// 診断結果に行く
		miseruSindan();
	}
};


/**
 * 診断結果を判定して返す
 *
 * @returns {number}
 */
let keisan = () => {
	//質問1の回答は、ars.toruKotae(1)で取れる。引数は質問番号。
	let a1 = ars.toruKotae(1);

	let kekka = 0; //結果

	// 質問1の回答によって、結果を変える
	if(a1 == 0) {
		kekka = 2;
	}
	else if(a1 == 1) {
		kekka = 4;
	}
	else if(a1 == 2) {
		kekka = 1;
	}
	else if(a1 == 3) {
		kekka = 3;
	}
	return kekka;
};