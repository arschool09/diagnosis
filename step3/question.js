/****************
 * 質問ページで使うJavaScript
 ****************/

/**
 * 質問のページで最初に呼ばれる関数
 * - 質問1を表示する
 */
let kaisi = () => {
	// 質問1を表示する
	gotoQ1();
};


/**
 * 質問1 を表示する
 * 文章で選択する質問
 */
let gotoQ1 = () => {
	// 質問の番号（質問1なので1をセット）
	let qnum = 1;

	// 質問の見出し
	let title = "あなたが小学校から塾に通うとします。そのときに乗るとしたら、どの通勤電車に乗りたいですか？";

	// 選択肢の文章
	let choices = [
		"やっぱり、ぐるぐる回って楽しい山手線！",
		"まっすぐ東西に伸びる、中野も通る中央線！",
		"池袋から新宿まで、ぐるっと遠回りの丸ノ内線",
		"混んでるけどぐんぐん飛ばす湘南新宿ライナー"
	];

	// 質問を表示する関数を実行
	ars.showTextQ(qnum, title, choices);
};


/**
 * 質問2 を表示する
 * 文章で選択する質問
 */
let gotoQ2 = () => {
	// 質問の番号（質問1なので1をセット）
	let qnum = 2;

	// 質問の見出しを設定する
	let title = "あなたは電車旅行で旅行していて、駅ビルでレストランに入りました。お昼ごはんにどれを食べますか？？";

	// 画像を選ぶ場合は、選択肢のファイル名を配列にする
	let choices = [
		"img/q2-1.jpg",
		"img/q2-2.jpg",
		"img/q2-3.jpg",
		"img/q2-4.jpg"
	];

	// 画像の質問を表示するときの関数
	ars.showImageQ(qnum, title, choices);
};

/**
 * 質問で選択肢を選んだときの処理
 * @param qnum 答えた質問番号（何問目か）
 */
let selectAnswer = (qnum) => {
	// 1問目の回答後は次の質問（2問目）に行く
	if(qnum == 1){
		gotoQ2();
	}
	// 2問目の回答後は診断結果に行く
	else if(qnum == 2){
		gotoResult();
	}
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
 * 診断結果を判定して返す
 *
 * @returns {number}
 */
let calculate = () => {
	//質問1の回答は、ars.getAnswer(1)で取れる。引数は質問番号。
	let a1 = ars.getAnswer(1);
	//質問2の回答は、ars.getAnswer(2)で取れる。
	let a2 = ars.getAnswer(2);

	let score1 = 0; //質問1の得点

	//質問1の得点を計算
	if(a1 == 0){
		score1 = 10;
	}
	else if(a1 == 1){
		score1 = 20;
	}
	else if(a1 == 2){
		score1 = 30;
	}
	else if(a1 == 3){
		score1 = 50;
	}


	let score2 = 0; //質問2の得点

	//質問2の得点を計算
	if(a2 == 0){
		score2 = 50;
	}
	else if(a2 == 1){
		score2 = 20;
	}
	else if(a2 == 2){
		score2 = 30;
	}
	else if(a2 == 3){
		score2 = 0;
	}

	let scoreTotal = score1 + score2; //得点合計（質問1の得点 + 質問2の得点）
	let result = 0; //診断結果

	// 点数によって、診断結果を分ける
	if(scoreTotal < 30){
		result = 4;
	}
	else if(scoreTotal < 50){
		result = 3;
	}
	else if(scoreTotal < 80){
		result = 2;
	}
	else {
		result = 1;
	}

	return result;
};