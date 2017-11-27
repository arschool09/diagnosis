/****************
 * 質問ページで使うJavaScript
 ****************/

/**
 * 質問のページで最初に呼ばれる関数
 * - 質問1を表示する
 */
let startQ = () => {
	// アプリのタイトルを設定する
	ars.setTitle('ArSchoolで電車診断');

	// 質問1を表示する
	gotoQ1();
};


/**
 * 質問1 を表示する
 * 文章で選択する質問
 */
let gotoQ1 = () => {
	// 質問を始めるときは new Quiz(qn)する
	// 引数qnは、質問の番号（質問1なので1をセット）
	let q = new Quiz(1);

	// 質問文
	q.state('あなたが小学校から塾に通うとします。そのときに乗るとしたら、どの通勤電車に乗りたいですか？');

	// 選択肢が文章の場合はt, 画像の場合はiをセット
	q.type('t');

	// 選択肢を追加していく
	q.choice('やっぱり、ぐるぐる回って楽しい山手線！');
	q.choice('まっすぐ東西に伸びる、中野も通る中央線！');
	q.choice('池袋から新宿まで、ぐるっと遠回りの丸ノ内線！');
	q.choice('混んでるけどぐんぐん飛ばす湘南新宿ライナー！');

};


/**
 * 質問2 を表示する
 * 画像を選択する質問
 */
let gotoQ2 = () => {
	// 質問を始めるときは new Quiz(qn)する
	// 引数qnは、質問の番号（質問2なので2をセット）
	let q = new Quiz(2);

	// 質問文
	q.state('あなたは電車旅行中です。駅ビルでレストランに入りました。お昼ごはんにどれを食べますか？');

	// 選択肢が文章の場合はt, 画像の場合はiをセット
	q.type('i');

	// 選択肢を追加していく
	q.choice('img/q2-1.jpg');
	q.choice('img/q2-2.jpg');
	q.choice('img/q2-3.jpg');
	q.choice('img/q2-4.jpg');

};


/**
 * 全質問が終わり、診断結果ページへ移動する
 */
let gotoResult = () => {
	// 診断結果を取得（診断結果が何番か）
	let result = calculate();

	// ページを移動する
	location.href = "result.html?r="+result;
};


/**
 * 質問で選択肢を選んだときの処理
 * @param qn 答えた質問番号（何問目か）
 */
let selectAnswer = (qn) => {
	// 1問目の回答後は次の質問（2問目）に行く
	if(qn == 1){
		gotoQ2();
	}
	// 2問目の回答後は診断結果に行く
	else if(qn == 2){
		gotoResult();
	}
};


/**
 * 診断結果を判定して返す
 *
 * @returns {number}
 */
let calculate = () => {
	//質問1の回答は、ars.getAnswer(1)で取れる。引数は質問番号。
	let a1 = ars.getAnswer(1);

	let result = 0; //結果

	// 質問1の回答によって、結果を変える
	if(a1 == 0) {
		result = 1;
	}
	else if(a1 == 1) {
		result = 2;
	}
	else if(a1 == 2) {
		result = 3;
	}
	else if(a1 == 3) {
		result = 4;
	}
	return result;
};