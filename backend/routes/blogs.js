const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Blogs = require("../models/Blogs");
const fetchuser = require("../middleware/fetchuser");


router.get("/fetchblogs", async (req, res) => {
  try {
    const blogs = await Blogs.find();
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
router.get("/fetchblog", fetchuser,async (req, res) => {
  try {
    const blogs = await Blogs.find({ user: req.user.id });
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

router.get("/fetchblogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id; 
    const blog = await Blogs.findById(blogId); 
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Some error occurred');
  }
});


router.post("/addblog",fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "description Must be atleast 5 charecters long"
    ).isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description,img,tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const blog = new Blogs({
        title,
        img,
        description,
        tag,
        user: req.user.id,
      });
      const saveblog = await blog.save();
      res.json(saveblog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.put("/updateblog/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newblog = {};
    if (title) {
      newblog.title = title;
    }
    if (description) {
      newblog.description = description;
    }
    if (tag) {
      newblog.tag = tag;
    }

    let blog = await Blogs.findById(req.params.id);
    if (!blog) {
      res.status(404).send("Not Found ! ");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed !");
    }

    blog = await Blogs.findByIdAndUpdate(
      req.params.id,
      { $set: newblog },
      { new: true }
    );
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

router.delete("/deleteblog/:id", fetchuser, async (req, res) => {
  try {
    let blog = await Blogs.findById(req.params.id);
    if (!blog) {
      res.status(404).send("Not Found ! ");
    }
    if (blog.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed !");
    }
    blog = await Blogs.findByIdAndDelete(req.params.id);
    res.json({ Success: "blog Has been deleted", blog: blog });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});
module.exports = router;
