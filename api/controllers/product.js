const Product = require("../models/product");
const User = require("../models/user");

exports.getAllProducts = async (req, res, next) => {
  const page = +req.query.page;
  const limit = +req.query.limit;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    let products;
    const allProducts = await Product.find();
    if (startIndex < allProducts.length) {
      products = await Product.find().limit(limit).skip(startIndex);
    } else {
      products = await Product.find();
    }
    const paginationInfo = {};
    paginationInfo.totalPage = Math.ceil(allProducts.length / limit);
    if (products) {
      if (products.length !== allProducts.length) {
        if (endIndex < allProducts.length) {
          paginationInfo.nextPage = {
            page: page + 1,
          };
        }
        if (startIndex !== 0) {
          paginationInfo.prevPage = {
            page: page - 1,
          };
        }
      }
      console.log(paginationInfo);
      res.status(200).json({
        msg: "Products",
        products,
        paginationInfo,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const prod = await Product.findById(productId);
    if (prod) {
      res.status(200).json({
        msg: "Products",
        product: prod,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.createProduct = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  console.log(req);
  console.log(req.file);
  const prod = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description,
    creator: req.userId,
  });

  try {
    const product = await prod.save();
    if (product) {
      res.status(200).json({
        msg: "Products",
        createdProduct: product,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  try {
    const updateId = req.params.updateId;
    const userId = req.userId;
    const updated = await Product.update(
      { _id: updateId },
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          image: req.body.imageurl,
          description: req.body.description,
        },
      }
    );

    console.log(updated);
    if (updated) {
      const user = await User.findById(userId);
      if (user) {
        if (user.cart && user.cart.length) {
          const cartIndex = user.cart.findIndex((c) => c._id === updateId);
          if (cartIndex >= 0) {
            console.log(1);
            user.cart[cartIndex].name = req.body.name;
            user.cart[cartIndex].price = req.body.price;
            user.cart[cartIndex].image = req.body.imageurl;
            user.cart[cartIndex].description = req.body.description;
            console.log(user.cart);
            const result = await User.update(
              { _id: req.userId },
              {
                $set: {
                  cart: user.cart,
                },
              }
            );
          }
        }
      }
      res.status(200).json({
        msg: "Products",
        product: updated,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  if (!req.userId) {
    return res.status(400).json({ error: "Unauthorized" });
  }
  const delId = req.params.delId;
  try {
    const deleted = await Product.deleteOne({ _id: delId });
    if (deleted) {
      res.status(200).json({
        msg: "Deleted",
        product: deleted,
      });
      const user = await User.findById(req.userId);
      if (user) {
        if (user.cart && user.cart.length) {
          const cIndex = user.cart.findIndex((c) => c._id === delId);
          if (cIndex !== -1) {
            user.cart.splice(cIndex, 1);
            user.save();
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
