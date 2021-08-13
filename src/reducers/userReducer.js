const initialState = {
  isLogin: false
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN":
      return {
        ...state,
        isLogin: true,
        user: {
          attributes: action.payload.attributes,
          username: action.payload.username
        }
      }
    case "USER_LOGOUT": {
      return {
        ...state,
        isLogin: false,
        user: {}
      }
    }
    default:
      return state;
  }
}