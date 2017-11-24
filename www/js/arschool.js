/**
 * 診断アプリの難しい処理を受け持つライブラリクラス
 */
class Ars {
	constructor() {
		this.userAnswers = {}; //ユーザーの回答
		this.validator = new AppValidator(); //診断アプリのバリデーター
	}

	setTitle(title){
		$('#quiz-title').html(title);
	}
	/**
	 * 文章で選ぶ質問を表示する
	 * @param qnum 質問番号
	 * @param title 質問の見出し
	 * @param choices 質問の選択肢
	 */
	showTextQ(qnum, title, choices){
		// 引数のバリデーション
		if(!this.validator.run('Ars.showTextQ', {qnum, title, choices})){
			return false;
		}

		//タイトルを変更する
		$('#question-state').html(title);

		//選択肢のクラス変更
		const $ulSelect = $('#ul-select');
		$ulSelect.removeClass('image');
		$ulSelect.addClass('text');
		$ulSelect.attr('data-qnum', qnum);


		// 選択肢のHTMLを作成する
		let choicesHtml = "";
		for(let i=0; i<choices.length; i++){
			let label = choices[i];
			let html = `
<li data-answer="${i}" class="trg-q">
	${label}
</li>
`;

			choicesHtml += html;
			choicesHtml += "\n";
		}


		//選択肢を表示する
		$ulSelect.html(choicesHtml);

	}


	/**
	* 画像で選ぶ質問を表示する
	* @param qnum 質問番号
	* @param title 質問の見出し
	* @param choices 質問の選択肢
	*/
	showImageQ (qnum, title, choices){
		// 引数のバリデーション
		if(!this.validator.run('Ars.showImageQ', {qnum, title, choices})){
			return false;
		}

		//タイトルを変更する
		$('#question-state').html(title);

		//選択肢のクラス変更
		const $ulSelect = $('#ul-select');
		$ulSelect.removeClass('text');
		$ulSelect.addClass('image');
		$ulSelect.attr('data-qnum', qnum);

		// 選択肢のHTMLを作成する
		let choicesHtml = "";
		for(let i=0; i<choices.length; i++){
			// let html = Tpl.imageChoice;
			// let html = this.imageChoiceTpl;
			let image = choices[i];
			let html = `
<li data-answer="${i}" class="trg-q">
	<img src="${image}" class="choice-image">
</li>
`;

			choicesHtml += html;
			choicesHtml += "\n";

		}

		//選択肢を表示する
		$ulSelect.html(choicesHtml);

	}


	/**
	 * 診断結果を表示する
	 * @param state 診断結果の見出し
	 * @param image 画像のsrc
	 * @param detail 診断結果の詳細
	 */
	showResult(state, image, detail){
		//タイトルをセット
		this.resultState(state);

		// 画像をセット
		this.resultImage(image);

		//診断結果のテキストをセット
		this.resultDetail(detail)
	}

	resultState(state){
		//タイトルをセット
		$('#result-state').html(state);
	}

	resultImage(image){
		// 画像をセット
		let html = `<img src=${image}>`;
		$('#result-image').html(html);
	}

	resultDetail(detail){
		//診断結果のテキストをセット
		$('#result-detail').html(detail);
	}



	/**
	 * 各質問の回答を保存する
	 * @param qnum 質問番号
	 * @param answer 選択した選択肢番号
	 */
	saveAnswer(qnum, answer){
		let question = "q" + qnum;
		this.userAnswers[question] = answer;
	}


	/**
	 * 各質問の回答結果を取得する
	 * @returns {{}|*}
	 */
	getAnswers(){
		return this.userAnswers;
	}

	/**
	 * 特定の回答を返す
	 * @param qnum
	 * @returns {number}
	 */
	getAnswer(qnum){
		let question = "q" + qnum;
		if(this.userAnswers[question] == null) {
			Validator.alert('qnumが正しくありません。 qnum='+qnum);
			return -1;
		}
		else {
			return parseInt(this.userAnswers[question]);
		}

	}


	/**
	 * 前の質問に戻るボタンを表示する
	 * 表示時は、data-to属性に、現在の質問番号をセット
	 * @param qnum 表示している質問番号
	 */
	showBackButton(qnum){
		//戻るボタン表示
		$('#back-button').attr('data-to', qnum);
		$('#back-button').show();
	}

	/**
	 * 前の質問に戻るボタンを非表示にする
	 */
	hideBackButton(){
		$('#back-button').hide();
	}


	/**
	 * 診断結果を取得し返す
	 * 当処理ではGETパラメータのrの値を返す
	 * @returns {number}
	 */
	getResult(){
		return parseInt(Util.getUrlVars('r'));
	}


	/**
	 * 質問ページの初期処理
	 * イベントバインドなどの初期化処理を行う
	 */
	initQ(){
		//質問の選択肢（回答時）のクリックイベント
		$(document).on('click', '.trg-q', function(){
			if(typeof selectAnswer !== 'function') Validator.notFunction('selectAnswer');

			let qnum = parseInt($(this).parent('#ul-select').attr('data-qnum'));
			let answer = parseInt($(this).attr('data-answer'));

			// 質問の回答を保存する
			ars.saveAnswer(qnum, answer);

			selectAnswer(qnum);
		});

		//戻るボタンのバインド
		$('#back-button').on('click', function(){
			let qnum = $(this).attr('data-to');
			qnum = parseInt(qnum);

			if(typeof clickBackButton !== 'function') Validator.notFunction('clickBackButton');
			clickBackButton(qnum);
		});

		if(typeof startQ !== 'function') Validator.notFunction('startQ');
		startQ();

	}


	/**
	 * 診断結果ページの初期処理
	 */
	initR(){
		if(typeof startR !== 'function') Validator.notFunction('startR');
		startR();
	}

}


/**
 * 診断アプリのバリデーター
 */
class AppValidator extends Validator {
	constructor() {
		super();
		// 診断アプリの関数ごとの引数バリデーションルール
		this.rules = {
			'Ars.showTextQ' : {
				'qnum' : [
					['type', 'number'], 'required'
				],
				'title' : [
					['type', 'string'], 'required'
				],
				'choices' : [
					['type', 'array'], 'required'
				]
			},
			'Ars.showImageQ' : {
				'qnum' : [
					['type', 'number'], 'required'
				],
				'title' : [
					['type', 'string'], 'required'
				],
				'choices' : [
					['type', 'array'], 'required'
				]
			}
		};
	}

}

/**
 * 質問クラス
 */
class Quiz {
	constructor(qnum) {
		this.data = {
			qnum : qnum, //質問番号
			choices : [], //選択肢
			type : null //質問のタイプ(t:文章, i:画像か)
		};

		this.init();
	}

	/**
	 * 質問の初期化
	 */
	init(){
		//タイトルを変更する
		$('#question-state').html('');

		//選択肢のクラス変更
		const $ulSelect = $('#ul-select');
		$ulSelect.html('');
		$ulSelect.removeClass('text');
		$ulSelect.removeClass('image');
		$ulSelect.attr('data-qnum', this.data.qnum);
	}

	/**
	 * 質問のタイプ（文章(t)か画像(i)か）を設定する
	 * @param type
	 */
	type(type){
		// typeはtかiのみ設定できる
		if(type !== 't' && type !== 'i') {
			Validator.alert('type()にはtかiをセットしてください');
			return false;
		}

		this.data.type = type;

		const $ulSelect = $('#ul-select');
		if(type === 't') {
			$ulSelect.addClass('text');
		}
		else {
			$ulSelect.addClass('image');
		}


		return true;
	}

	/**
	 * 質問文を設定する
	 * @param title
	 */
	state(title){
		$('#question-state').html(title);
	}

	/**
	 * 質問の選択肢を追加する
	 * 前提：this.type()が実行済みであること
	 * @param choice
	 */
	choice(choice){
		if(this.data.type == null) {
			Validator.alert('type()を先に実行して、質問のタイプを決めてください');
			return false;
		}

		// 選択肢のHTMLを作成する
		let i = this.data.choices.length;
		this.data.choices.push(choice);
		let html;
		if(this.data.type === 't') {
			html = `
<li data-answer="${i}" class="trg-q">
	${choice}
</li>
`;
		}
		else {
			html = `
<li data-answer="${i}" class="trg-q">
	<img src="${choice}" class="choice-image">
</li>
`;
		}

		//選択肢を表示する
		$('#ul-select').append(html);

	}


}