import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPortfolio = (id) => API.get(`/portfolios/${id}`);
export const fetchPortfolios = (page) => API.get(`/portfolios?page=${page}`);
export const fetchPortfoliosBySearch = (searchQuery) =>
  API.get(
    `/portfolios/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPortfolio = (newPortfolio) =>
  API.post("/portfolios", newPortfolio);
export const likePortfolio = (id) =>
  API.patch(`/portfolios/${id}/likePortfolio`);
export const updatePortfolio = (id, updatedPortfolio) =>
  API.patch(`/portfolios/${id}`, updatedPortfolio);
export const deletePortfolio = (id) => API.delete(`/portfolios/${id}`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
