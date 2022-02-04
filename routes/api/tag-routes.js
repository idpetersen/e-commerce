const router = require("express").Router();
const { Tag, Product } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: [Product],
  })
    .then((tags) => {
      res.json(tags);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", async (req, res) => {
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: [Product],
    });
    if (!getTag) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    }
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((tag) => res.status(200).json(tag))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/:id", async (req, res) => {
  try {
    const getTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!getTag[0]) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    } 
    res.status(200).json(getTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const tagDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDelete) {
      res.status(404).json({ message: "No tag with this id!" });
      return;
    }
    res.status(200).json(tagDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
