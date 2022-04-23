import { AUTH } from "../types/action.types";
import * as api from "../api";

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    alert("Something worng, login or password is not correct.");
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });

    router.push("/");
  } catch (error) {
    alert(
      "Something wrong, check the input fields, if everything is filled in correctly."
    );
    console.log(error);
  }
};
