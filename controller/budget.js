const Budget = require("../models/budget");

// Helper function to handle errors
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: "Server error", error: error.message });
};

// Get all budgets
exports.getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find();
    res.status(200).json(budgets);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all budgets for a specific user
exports.getBudgetsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const budgets = await Budget.find({ userId });

    if (budgets.length === 0) {
      return res
        .status(404)
        .json({ message: "No budgets found for this user" });
    }

    res.status(200).json(budgets);
  } catch (error) {
    handleError(res, error);
  }
};

// Create a new budget
exports.createBudget = async (req, res) => {
  try {
    const { userId, totalAmount, startDate, description } = req.body;

    if (!userId || !totalAmount || !startDate || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const budget = new Budget(req.body);
    await budget.save();
    res.status(201).json(budget);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a budget by ID
exports.getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(budget);
  } catch (error) {
    handleError(res, error);
  }
};

// Update a budget
exports.updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure validation rules are applied on update
    });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json(budget);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a budget
exports.deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findByIdAndDelete(req.params.id);

    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
