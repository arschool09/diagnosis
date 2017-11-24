/**
 * 便利ツール
 */
class Util {
	/**
	 * URLパラメータから値を取得する
	 * thanks for https://qiita.com/Evolutor_web/items/c9b940f752883676b35d
	 * @param target
	 * @returns {*}
	 */
	static getUrlVars(target){
		let vars = {};
		let param = location.search.substring(1).split('&');
		for(let i = 0; i < param.length; i++) {
			let keySearch = param[i].search(/=/);
			let key = '';
			if(keySearch != -1) key = param[i].slice(0, keySearch);
			let val = param[i].slice(param[i].indexOf('=', 0) + 1);
			if(key != '') vars[key] = decodeURI(val);
		}

		if(target != null){
			return vars[target];
		}else{
			return vars;
		}
	}

}

/**
 * バリデーション
 * 生徒の関数呼び出し（引数）がおかしい場合や、必要な関数が未定義のチェックなどを受け持つ
 */
class Validator {

	constructor() {
		this.rules = {};
		this.init();
	}

	/**
	 * 初期処理
	 * アラート用モーダル(bootstrap)を追加
	 */
	init(){
		$(function() {
			const alertModal = `
	<div class="modal" id="alertModal">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">エラーがあります</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p id="errorMsg"></p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
`;
			$('body').append(alertModal);
		});

	}



	/**
	 * 関数の引数バリデーション用ツール
	 * 生徒の関数呼び出し（引数）がおかしい場合に、bootstrapのmodalでエラーを表示
	 * 引数の型チェック、必須チェックのみ行う
	 * @param funcName
	 * @param args
	 * @returns {boolean}
	 */
	run(funcName, args){
		//バリデーションルール。本来外部定義すべき。
		const validationRules = this.rules;

		let errors = [];
		let res = true;

		// ルールが未定義の関数の場合は正常終了
		if(validationRules[funcName] == null){
			console.log(`関数${funcName}にvalidation ruleが設定されていません`);
			return true;
		}

		const funcRules = validationRules[funcName];

		// 引数ごとにチェックする
		$.each(args, function (argKey, argVal) {
			// 引数のルールが未定義なら正常終了
			if(funcRules[argKey] == null){
				console.log(`引数${argKey}にvalidation ruleが設定されていません`);
				return;
			}

			const argRules = funcRules[argKey];

			// 引数にルールが定義されている場合、定義ごとにloop
			$.each(argRules, function(i, rule){
				let validationType, validationOption;
				if(typeof rule === 'string'){
					validationType = rule;
				}
				else {
					validationType = rule[0];
					validationOption = rule[1];
				}

				// 型のバリデーション
				if(validationType === 'type') {
					// null, undefinedは必要ならrequiredでチェックするのでOK
					if(argVal == null) {
						return true;
					}
					if(validationOption === 'array') {
						if(!Array.isArray(argVal)) {
							errors.push(`${argKey}は配列にしてください`);
						}
					}
					else if(typeof argVal !== validationOption) {
						errors.push(`${argKey}は${validationOption}型にしてください`);
					}
				}
				else if(validationType === 'required') {
					if(argVal == null || argVal === '' || (Array.isArray(argVal) && argVal.length === 0)){
						errors.push(`${argKey}は必須です`);
					}
				}

			});

		});


		// エラーがあればmodalで表示しfalseをreturn
		if(errors.length) {
			let msg = `関数 ${funcName}() の引数でエラーがあります。<br>`;
			msg += errors.join('<br>');

			Validator.alert(msg);

			res = false;
		}

		return res;
	}

	/**
	 * bootstrap modalでalert表示
	 * @param msg
	 */
	static alert(msg){
		$('#errorMsg').html(msg);
		$('#alertModal').modal({
		});

		return false;
	}

	static notFunction(funcName){

		// エラーがあればmodalで表示しfalseをreturn
		let msg = `関数 ${funcName}() がありません<br>`;
		Validator.alert(msg);

	}

}
