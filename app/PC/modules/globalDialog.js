/**
 * Created by Huhy on 2016/8/29.
 */
import * as type from '../constants/globalDialogTypes'

const state = {
  title: '',
  message: '',
  icon: 'warning',
  confirm: null,
  cancel: null,
  close: null,
  isShow: false
}

const mutations = {
  [type.GLOBOLDIALOG_TRIGGERDIAPLAY] (state, isShow) {
    state.isShow = isShow
  },
  [type.GLOBOLDIALOG_CHANGEICON] (state, icon) {
    state.icon = icon
  },
  [type.GLOBOLDIALOG_SETMESSAGE] (state, message) {
    state.message = message
  },
  [type.GLOBOLDIALOG_SETTITLE] (state, title) {
    state.title = title
  },
  [type.GLOBOLDIALOG_SETCANCEL] (state, cancel) {
    state.cancel = cancel
  },
  [type.GLOBOLDIALOG_SETCLOSE] (state, close) {
    state.close = close
  },
  [type.GLOBOLDIALOG_SETCONFIRM] (state, confirm) {
    state.confirm = confirm
  }
}

export default {
  state,
  mutations
}
