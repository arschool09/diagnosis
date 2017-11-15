/**
 * 診断結果を出すロジックのサンプル
 * 各条件でそれぞれ分岐して出す方法
 * @param answers
 * @returns {number}
 */
let getResultEach = (answers) => {
	//質問1, 質問2は下記で取れる。
	let q1 = answers.q1;
	let q2 = answers.q2;

	let result = 0; //結果
	if(q1 == 0){
		if(q2 == 0){
			result = 1;
		}
		else if(q2 == 1){
			result = 2;
		}
		else if(q2 == 2){
			result = 3;
		}

	}else if(q1 == 1){
		if(q2 == 0){
			result = 4;
		}
		else if(q2 == 1){
			result = 1;
		}
		else if(q2 == 2){
			result = 2;
		}
	}else if(q1 == 2){
		if(q2 == 0){
			result = 3;
		}
		else if(q2 == 1){
			result = 4;
		}
		else if(q2 == 2){
			result = 1;
		}
	}else if(q1 == 3){
		if(q2 == 0){
			result = 2;
		}
		else if(q2 == 1){
			result = 3;
		}
		else if(q2 == 2){
			result = 4;
		}
	}

	return result;
};


/**
 * 診断結果を出すロジックのサンプル
 * 各質問の選択肢によって、点数を足していく。
 * 最後に、その点数からランダムで診断する。
 * @param answers
 * @returns {number}
 */
let getResultRandom = (answers) => {
	//質問1, 質問2は下記で取れる。
	let q1 = answers.q1;
	let q2 = answers.q2;

	let point = 0;
	if (q1 == 0) {
		point = point + 10;
	} else if (q1 == 1){
		point = point + 15;
	} else if (q1 == 2) {
		point = point + 20;
	} else {
		point = point + 25;
	}


	if(q2 == 0){
		point = point + 4;
	} else if (q2 == 1){
		point = point + 6;
	} else if (q2 == 2){
		point = point + 8;
	} else {
		point = point + 10;
	}

	let result = point % 4 + 1;

	return result; //結果
};


/**
 * 診断結果を出すロジックのサンプル
 * 各質問の選択肢によって、点数を足していく。
 * 最後に、その点数の範囲によって診断する。
 * @param answers
 * @returns {number}
 */
let getResultRange = (answers) => {
	//質問1, 質問2は下記で取れる。
	let q1 = answers.q1;
	let q2 = answers.q2;

	let result = 0; //結果
	let point = 0;
	if(q1 == 0){
		point = point + 10;
	}
	else if(q1 == 1){
		point = point + 15;
	}
	else if(q1 == 2){
		point = point + 20;
	}
	else{
		point = point + 25;
	}


	if(q2 == 0){
		point = point + 4;
	}
	else if(q2 == 1){
		point = point + 6;
	}
	else if(q2 == 2){
		point = point + 8;
	}
	else if(q2 == 3){
		point = point + 10;
	}

	if(point < 15){
		result = 1;
	}
	else if(point < 20){
		result = 2;
	}
	else if(point < 25){
		result = 3;
	}
	else{
		result = 4;
	}

	return result;
};


