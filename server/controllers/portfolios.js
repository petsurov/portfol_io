import express from "express";
import mongoose from "mongoose";
import portfolio from "../models/portfolio.js";
const router = express.Router();

export const getPortfolios = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await portfolio.countDocuments({});
    const portfolios = await portfolio
      .find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: portfolios,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPortfoliosBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const portfolios = await portfolio.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ data: portfolios });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolios = await portfolio.findById(id);

    res.status(200).json(portfolios);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPortfolio = async (req, res) => {
  const portfolios = req.body;
  const newPortfolio = new portfolio({
    ...portfolios,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPortfolio.save();

    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    introduction,
    skillset,
    project1,
    project2,
    project3,
    about,
    creator,
    tags,
    selectedFile,
  } = req.body;

  //Check if this id is really a mongoose object id
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No portfolio with that id");
  //if true:
  const updatedPortfolio = {
    creator,
    title,
    introduction,
    skillset,
    project1,
    project2,
    project3,
    about,
    tags,
    selectedFile,
    _id: id,
  };
  await portfolio.findByIdAndUpdate(id, updatedPortfolio, { new: true });

  res.json(updatedPortfolio);
};

export const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No portfolio with id: ${id}`);
  await portfolio.findByIdAndRemove(id);

  res.json({ message: "Portfolio deleted successfully" });
};

export const likePortfolio = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No portfolio with id: ${id}`);

  const portfolios = await portfolio.findById(id);

  const index = portfolios.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    portfolios.likes.push(req.userId);
  } else {
    portfolios.likes = portfolios.likes.filter(
      (id) => id !== String(req.userId)
    );
  }
  const updatedPortfolio = await portfolio.findByIdAndUpdate(id, portfolios, {
    new: true,
  });
  res.status(200).json(updatedPortfolio);
};
export default router;
