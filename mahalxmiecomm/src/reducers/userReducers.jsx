export const myActionsUsers = {
  LOGIN_REQUEST: "USER_LOGIN_REQUEST",
  LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  LOGIN_FAIL: "USER_LOGIN_FAIL",
  LOGOUT: "USER_LOGOUT",

  REGISTER_REQUEST: "USER_REGISTER_REQUEST",
  REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  REGISTER_FAIL: "USER_REGISTER_FAIL",

  DETAILS_REQUEST: "USER_DETAILS_REQUEST",
  DETAILS_SUCCESS: "USER_DETAILS_SUCCESS",
  DETAILS_FAIL: "USER_DETAILS_FAIL",

  PROFILE_REQUEST: "USER_UPDATE_PROFILE_REQUEST",
  PROFILE_SUCCESS: "USER_UPDATE_PROFILE_SUCCESS",
  PROFILE_FAIL: "USER_UPDATE_PROFILE_FAIL",
  PROFILE_RESET: "USER_UPDATE_PROFILE_RESET",

  LIST_REQUEST: "USER_LIST_REQUEST",
  LIST_SUCCESS: "USER_LIST_SUCCESS",
  LIST_FAIL: "USER_LIST_FAIL",
  LIST_RESET: "USER_LIST_RESET",
};

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsUsers.LOGIN_REQUEST:
      return { loading: true };
    case myActionsUsers.LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case myActionsUsers.LOGIN_FAIL:
      return { loading: false, error: payload };
    case myActionsUsers.LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsUsers.REGISTER_REQUEST:
      return { loading: true };
    case myActionsUsers.REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case myActionsUsers.REGISTER_FAIL:
      return { loading: false, error: payload };
    case myActionsUsers.LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsUsers.DETAILS_REQUEST:
      return { ...state, loading: true };
    case myActionsUsers.DETAILS_SUCCESS:
      return { loading: false, user: payload };
    case myActionsUsers.DETAILS_FAIL:
      return { loading: false, error: payload };
    case myActionsUsers.LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsUsers.PROFILE_REQUEST:
      return { loading: true };
    case myActionsUsers.PROFILE_SUCCESS:
      return { loading: false, success: true, user: payload };
    case myActionsUsers.PROFILE_FAIL:
      return { loading: false, error: payload };
    case myActionsUsers.PROFILE_RESET:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case myActionsUsers.LIST_REQUEST:
      return { loading: true };
    case myActionsUsers.LIST_SUCCESS:
      return { loading: false, users: payload };
    case myActionsUsers.LIST_FAIL:
      return { loading: false, error: payload };
    case myActionsUsers.LIST_RESET:
      return {users:[]};

    default:
      return state;
  }
};
