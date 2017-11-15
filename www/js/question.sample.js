/****************
 * 質問ページで使うJavaScript
 ****************/

/**
 * 質問のページで最初に呼ばれる関数
 * - 質問1を表示する
 */
let initQ = () => {
	// 質問1を表示する
	gotoQ1();
};


/**
 * 質問1 を表示する
 * 画像で選択する場合
 */
let gotoQ1 = () => {
	// 質問の番号を設定する（質問1だったら1, 質問2だったら2）
	let qnum = 1;

	// 質問の見出しを設定する
	let title = "あなたが小学校から塾に通うとします。そのときに乗るとしたら、どの通勤電車に乗りたいですか？";

	// 文章を選ぶ場合は、選択肢の文章を配列にする
	let choices = [
		"やっぱり、ぐるぐる回って楽しい山手線！",
		"まっすぐ東西に伸びる、中野も通る中央線！",
		"池袋から新宿まで、ぐるっと遠回りの丸ノ内線"
	];

	// 文章の質問を表示するときの関数
	ars.showTextQ(qnum, title, choices);

	// １問目の場合は、「前の質問に戻る」ボタン不要
	ars.hideBackButton(qnum);
};


/**
 * 質問で選択肢を選んだときの処理
 * @param qnum 答えた質問番号（何問目か）
 * @param answer 選んだ選択肢の番号
 */
let selectAnswer = (qnum, answer) => {
	// 質問の回答を保存する
	ars.saveAnswer(qnum, answer);

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
 * 質問2 を表示する
 */
let gotoQ2 = () => {
	// 質問の番号を設定する（質問1だったら1, 質問2だったら2）
	let qnum = 2;

	// 質問の見出しを設定する
	let title = "あなたは電車旅行で旅行していて、駅ビルでレストランに入りました。お昼ごはんにどれを食べますか？？";

	// 画像を選ぶ場合は、選択肢のファイル名を配列にする
	let choices = [
		"img/sample/q2-1.jpg",
		"img/sample/q2-2.jpg",
		"img/sample/q2-3.jpg",
		"img/sample/q2-4.jpg"
	];

	// 画像の質問を表示するときの関数
	ars.showImageQ(qnum, title, choices);

	// 2問目の場合は、「前の質問に戻る」ボタンを表示する
	ars.showBackButton(qnum);
};


/**
 * 全質問が終わり、診断結果ページへ移動する
 */
let gotoResult = () => {
	// 今まで答えた回答を取得
	let answers = ars.getAnswers();

	// 診断結果を取得（診断結果が何番か）
	let result = getResult(answers);

	// ページを移動する
	// location.href = "result_sample.html?r="+result;
	location.href = "result_sample.html?r="+result;
};


/**
 * 戻るボタンをクリックしたときの処理
 * 質問番号 qnum に合わせて、前の質問を表示する
 * @param qnum 現在の質問番号
 */
let clickBackButton = (qnum) => {
	if(qnum == 2){
		gotoQ1();
	}
};


/**
 * 診断結果を判定して返す
 *
 * @param answers 今まで選択した結果
 * @returns {string}
 */
let getResult = (answers) => {
	//質問1, 質問2の回答は下記で取れる。
	let q1 = answers.q1;
	let q2 = answers.q2;

	//(下記は、サンプルのうち、1つ1つ条件分岐して結果を出す方法)

	let result = ""; //結果

	if(q1 == 0){
		if(q2 == 0){
			result = '1';
		}
		else if(q2 == 1){
			result = '2';
		}
		else if(q2 == 2){
			result = '3';
		}

	}else if(q1 == 1){
		if(q2 == 0){
			result = '4';
		}
		else if(q2 == 1){
			result = '1';
		}
		else if(q2 == 2){
			result = '2';
		}
	}else if(q1 == 2){
		if(q2 == 0){
			result = '3';
		}
		else if(q2 == 1){
			result = '4';
		}
		else if(q2 == 2){
			result = '1';
		}
	}else if(q1 == 3){
		if(q2 == 0){
			result = '2';
		}
		else if(q2 == 1){
			result = '3';
		}
		else if(q2 == 2){
			result = '4';
		}
	}

	return result;
};