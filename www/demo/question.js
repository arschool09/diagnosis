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

	// １問目の場合は、「前の質問に戻る」ボタン不要
	ars.hideBackButton(1);
};


/**
 * 質問2 を表示する
 * 画像を選択する質問
 */
let gotoQ2 = () => {
	// 質問を始めるときは new Quiz(qn)する
	// 引数qnは、質問の番号（質問2なので2をセット）
	let q = new Quiz(2);

	// 質問の見出し
	q.state('あなたは電車旅行中です。駅ビルでレストランに入りました。お昼ごはんにどれを食べますか？');

	// 選択肢が文章の場合はt, 画像の場合はiをセット
	q.type('i');

	// 選択肢を追加していく
	q.choice('img/q2-1.jpg');
	q.choice('img/q2-2.jpg');
	q.choice('img/q2-3.jpg');
	q.choice('img/q2-4.jpg');

	// 2問目の場合は、「前の質問に戻る」ボタンを表示する
	ars.showBackButton(2);
};


/**
 * 質問3 を表示する
 * 文章を選択する質問
 */
let gotoQ3 = () => {
	// 質問を始めるときは new Quiz(qn)する
	// 引数qnは、質問の番号（質問2なので2をセット）
	let q = new Quiz(3);

	// 質問文
	q.state('あなたが鉄道会社で働くとしたら、どの仕事がいいですか？');

	// 選択肢が文章の場合はt, 画像の場合はiをセット
	q.type('t');

	// 選択肢を追加していく
	q.choice('運転手');
	q.choice('車掌');
	q.choice('駅員');
	q.choice('電車を作る人');

	// 2問目の場合は、「前の質問に戻る」ボタンを表示する
	ars.showBackButton(3);
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
	// 2問目の回答後は次の質問（3問目）に行く
	else if(qn == 2){
		gotoQ3();
	}
	// 3問目の回答後は診断結果に行く
	else if(qn == 3){
		gotoResult();
	}
};


/**
 * 診断結果を判定して返す
 *
 * @returns {number}
 */
let calculate = () => {
	//質問1, 質問2, 質問3の回答は下記で取れる。
	let a1 = ars.getAnswer(1);
	let a2 = ars.getAnswer(2);
	let a3 = ars.getAnswer(3);

	// 質問1での得点
	let score1 = 0;

	if(a1 == 0){
		score1 = 20;
	}else if(a1 == 1){
		score1 = 10;
	}else if(a1 == 2) {
		score1 = 50;
	}else if(a1 == 3) {
		score1 = 0;
	}


	// 質問2での得点
	let score2 = 0;

	if(a2 == 0){
		score2 = 10;
	}else if(a2 == 1){
		score2 = 0;
	}else if(a2 == 2) {
		score2 = 50;
	}else if(a2 == 3) {
		score2 = 30;
	}


	// 質問3での得点
	let score3 = 0;

	if(a3 == 0){
		score3 = 20;
	}else if(a3 == 1){
		score3 =40;
	}else if(a3 == 2) {
		score3 = 0;
	}else if(a3 == 3) {
		score3 = 50;
	}

	//合計点
	let scoreTotal = score1 + score2 + score3;
	//診断結果
	let result = 0;

	//合計点から診断結果を出す
	if(scoreTotal > 120) {
		result = 1;
	} else if(scoreTotal > 100){
		result = 2;
	} else if(scoreTotal > 50){
		result = 3;
	} else {
		result = 4;
	}

	return result;
};


/**
 * 戻るボタンをクリックしたときの処理
 * 質問番号 qn に合わせて、前の質問を表示する
 * @param qn 現在の質問番号
 */
let clickBackButton = (qn) => {
	if(qn == 2){
		gotoQ1();
	}
	else if(qn == 3){
		gotoQ2();
	}
};
