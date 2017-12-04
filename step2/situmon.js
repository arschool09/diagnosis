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
 * 質問2 を表示する
 * 文章で選択する質問
 */
let miseruQ2 = () => {
	// 質問を始めるときは new Situmon(?)する
	// 引数(?)は、質問の番号（質問2なので2をセット）
	let q = new Situmon(2);

	// 質問文
	q.bun('あなたは電車旅行中です。駅ビルでレストランに入りました。お昼ごはんにどれを食べますか？');

	// 選択肢が文章の場合はt, 画像の場合はiをセット
	q.syurui('i');

	// 選択肢を追加していく
	q.sentakusi('img/situmon1.jpg');
	q.sentakusi('img/situmon2.jpg');
	q.sentakusi('img/situmon3.jpg');
	q.sentakusi('img/situmon4.jpg');

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
	// 1問目の回答後は次の質問（2問目）に行く
	if(bangou == 1){
		miseruQ2();
	}
	// 2問目の回答後は診断結果に行く
	else if(bangou == 2){
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

	//質問2の回答は、ars.toruKotae(2)で取れる。
	let a2 = ars.toruKotae(2);

	let kekka = 0; //結果

	// 質問1, 質問2の回答によって、結果を変える
	if(a1 == 0 && a2 == 0) {
		kekka = 1;
	}
	else if(a1 == 0 && a2 == 1) {
		kekka = 2;
	}
	else if(a1 == 0 && a2 == 2) {
		kekka = 3;
	}
	else if(a1 == 0 && a2 == 3) {
		kekka = 4;
	}
	else if(a1 == 1 && a2 == 0) {
		kekka = 2;
	}
	else if(a1 == 1 && a2 == 1) {
		kekka = 3;
	}
	else if(a1 == 1 && a2 == 2) {
		kekka = 4;
	}
	else if(a1 == 1 && a2 == 3) {
		kekka = 1;
	}
	else if(a1 == 2 && a2 == 0) {
		kekka = 3;
	}
	else if(a1 == 2 && a2 == 1) {
		kekka = 4;
	}
	else if(a1 == 2 && a2 == 2) {
		kekka = 1;
	}
	else if(a1 == 2 && a2 == 3) {
		kekka = 2;
	}
	else if(a1 == 3 && a2 == 0) {
		kekka = 4;
	}
	else if(a1 == 3 && a2 == 1) {
		kekka = 1;
	}
	else if(a1 == 3 && a2 == 2) {
		kekka = 2;
	}
	else if(a1 == 3 && a2 == 3) {
		kekka = 3;
	}

	return kekka;
};