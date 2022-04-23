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
import * as api from "../api";

export const getPortfolio = (id) => async (dispatch) => {
  try {
    dispatch({ type: TRUE_LOAD });
    const { data } = await api.fetchPortfolio(id);

    dispatch({
      type: FETCH_PORTFOLIO,
      payload: data,
    });
    dispatch({ type: FALSE_LOAD });
  } catch (error) {
    console.log(error);
  }
};
export const getPortfolios = (page) => async (dispatch) => {
  try {
    dispatch({ type: TRUE_LOAD });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPortfolios(page);

    dispatch({
      type: FETCH_PORTFOLIOS,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: FALSE_LOAD });
  } catch (error) {
    console.log(error);
  }
};
export const getPortfoliosBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: TRUE_LOAD });
    const {
      data: { data },
    } = await api.fetchPortfoliosBySearch(searchQuery);
    dispatch({ type: SEARCH, payload: { data } });
    dispatch({ type: FALSE_LOAD });
  } catch (error) {
    console.log(error);
  }
};

export const createPortfolio = (portfolio, history) => async (dispatch) => {
  try {
    dispatch({ type: TRUE_LOAD });
    const { data } = await api.createPortfolio(portfolio);
    dispatch({ type: CREATE, payload: data });
    history.push(`/portfolios/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updatePortfolio = (id, portfolio) => async (dispatch) => {
  try {
    const { data } = await api.updatePortfolio(id, portfolio);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePortfolio = (id) => async (dispatch) => {
  try {
    await api.deletePortfolio(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePortfolio = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePortfolio(id, user?.token);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
