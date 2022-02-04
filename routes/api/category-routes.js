const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: [Product],
  })
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const getCategories = await Category.findByPk(req.params.id, {
      include: [Product],
    });
    if (!getCategories) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(getCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  Category.create(req.body)
    .then((category) => res.status(200).json(category))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const getCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!getCategory[0]) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoryDelete = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryDelete) {
      res.status(404).json({ message: "No category by this id!" });
      return;
    }
    res.status(200).json(categoryDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
