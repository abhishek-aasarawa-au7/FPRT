import {
  signin,
  signup,
  signout,
  profile,
  share,
} from "../actions/sign.action";

let initialState = {
  signup: false,
  signin: false,
  signout: false,
  profile: false,
  share: false,
};

const reducer = (state = initialState, action) => {
  if (action.type === signup) {
    return { ...state, signup: !state.signup };
  }

  if (action.type === signin) {
    return { ...state, signin: !state.signin };
  }

  if (action.type === signout) {
    return { ...state, signout: !state.signout };
  }

  if (action.type === profile) {
    return { ...state, profile: !state.profile };
  }

  if (action.type === share) {
    return { ...state, share: !state.share };
  }

  return state;
};

export default reducer;
