const mongoose = require("mongoose");
const Vegetable = require("../models/Vegetable");
const fileUpload = require("express-fileupload");

const getFruits = async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    if (vegetables) {
      res.status(200).json(vegetables);
    } else {
      throw new Error("Internal Server Error");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addVegetable = async (req, res) => {
  try {
    console.log(req.body);
    const { name, price, img } = req.body;
    if (!name || !price || !img) {
      throw new Error("Missing fields");
    }
    const veggie = await Vegetable.create({
      name,
      price,
      img,
    });
    if (veggie) {
      res.status(200).json(veggie);
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    console.log("HIT UPLOAD : ", req.files);
    console.log("REQ BODY : ", req.body);
    const uploadFile = req.files.file;
    // console.log(uploadFile.name);
    const { name, price, discount, description } = req.body;
    // console.log(uploadFile);
    // const name = uploadFile.name;
    // const md5 = uploadFile.md5;
    // const saveAs = `${md5}_${name}`;
    // const saveAs = `${name}`;
    // uploadFile.mv(`${__dirname}/assets/${saveAs}`, (err) => {
    //   if (err) throw new Error(err.message);
    //   res.status(200).json({ success: "File Uploaded successfully" });
    // });

    uploadFile.mv(`./assets/${uploadFile.name}`, (err) => {
      if (err) res.status(400).send(err);
    });

    const veggie = Vegetable.create({
      name: name,
      price: price,
      img: uploadFile.name,
      description: description,
      discount: discount,
    });

    if (veggie) {
      res.status(200).json({ success: "File Uploaded successfully" });
    } else {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    console.log("Catch block! : ", err);
    res.status(500).json({ error: err.message });
  }
};

const addProduct2 = async (req, res) => {
  try {
    console.log("REQ BODY : ", req.body);
    console.log("REQ FILES : ", req.files);
    res.status(200).send("OK");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { getFruits, addVegetable, addProduct, addProduct2 };
