import {
  FETCH_PORTFOLIO,
  FETCH_PORTFOLIOS,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  SEARCH,
  TRUE_LOAD,
  FALSE_LOAD,
} from "../types/action.types";

export default (state = { isLoading: true, portfolios: [] }, action) => {
  switch (action.type) {
    case TRUE_LOAD:
      return { ...state, isLoading: true };
    case FALSE_LOAD:
      return { ...state, isLoading: false };
    case FETCH_PORTFOLIO:
      return { ...state, portfolio: action.payload };
    case FETCH_PORTFOLIOS:
      return {
        ...state,
        portfolios: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case SEARCH:
      return { ...state, portfolios: action.payload.data };
    case LIKE:
      return {
        ...state,
        portfolios: state.portfolios.map((portfolio) =>
          portfolio._id === action.payload._id ? action.payload : portfolio
        ),
      };
    case CREATE:
      return { ...state, portfolios: [...state.portfolios, action.payload] };
    case UPDATE:
      return {
        ...state,
        portfolios: state.portfolios.map((portfolio) =>
          portfolio._id === action.payload._id ? action.payload : portfolio
        ),
      };
    case DELETE:
      return {
        ...state,
        portfolios: state.portfolios.filter(
          (portfolio) => portfolio._id !== action.payload
        ),
      };
    default:
      return state;
  }
};
