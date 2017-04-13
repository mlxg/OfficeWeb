export default {
	UPDATETODOLISTNUM:function (state,	newNum) {
		sessionStorage.todolistnum = newNum.num;
		return state.todoListNum = newNum.num;
	},
	UPDATECOPIESLISTNUM:function (state,	newNum) {
		sessionStorage.copieslistnum = newNum.num;
		return state.copiesListNum = newNum.num;
	}
};
