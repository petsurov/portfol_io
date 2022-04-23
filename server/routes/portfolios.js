import express from "express";

import {
  getPortfolio,
  getPortfolios,
  getPortfoliosBySearch,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  likePortfolio,
} from "../controllers/portfolios.js";

const router = express.Router();
import auth from "../middleware/auth.js";

router.get("/search", getPortfoliosBySearch);
router.get("/:id", getPortfolio);
router.get("/", getPortfolios);

router.post("/", auth, createPortfolio);

router.patch("/:id", auth, updatePortfolio);
router.patch("/:id/likePortfolio", auth, likePortfolio);

router.delete("/:id", auth, deletePortfolio);

export default router;
