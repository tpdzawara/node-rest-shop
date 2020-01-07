const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controller/products');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}

const upload = multer(
    {
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter
    });




//get all products from mongo db
router.get('/', ProductsController.get_all_products);

//Post products to database
router.post('/', checkAuth, upload.single('productImage'), ProductsController.add_new_product);

//Get product by id
router.get('/:productId',  ProductsController.products_get_product);

//Update product
router.patch('/:productId', checkAuth, ProductsController.update_get_product);

//Delete product
router.delete('/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;  