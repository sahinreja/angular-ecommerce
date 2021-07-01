const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer')
const nodemailer = require('nodemailer')
const data = require('../products/products.json')
const User = require('../models/user')
const Address = require('../models/address')
const Products = require('../models/products');
const MimeNode = require('nodemailer/lib/mime-node');
const router = express.Router();

const db = "mongodb+srv://sahin_512:sahin123@cluster0.xvowe.mongodb.net/node?retryWrites=true&w=majority";


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('Database connected')
    }
})


const diskStorage = multer.diskStorage({
    destination:(req , file , cb) =>{
        cb(null , 'images');
    },
    filename:(req,file , cb)=>{
        const mimeType = file.mimetype.split('/');
        const fileType = mimeType[1];
        const fileName = file.originalname + '.' + fileType;
        cb(null , fileName)
    }

})

const fileFilter = (req,file , cb)=>{
    const allowType = ["image/png" , "image/jpeg" , "image/jpg"];
    allowType.includes(file.mimetype) ? cb(null , true) : cb(null , false);
}


const storage = multer({storage:diskStorage , fileFilter:fileFilter}).single('image')

router.get('/products', (req, res) => {
    res.status(200).send(data)
})

router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    console.log(typeof (id))
    let item = data.allProducts.filter((element) => (element.id === parseInt(id)));
    if (item) {
        res.status(200).send(item);
    } else {
        res.status(401).send('Product not found');
    }

})




router.post('/products', (req, res) => {
    const user_id = req.body.user_id;
    let products = req.body.products;
    const totalCost = req.body.totalCost;
    const totalProductNumber = req.body.totalProductNumber;
    const address = req.body.address
    console.log(user_id, products);
    let dbproduct = new Products({
        user_id: user_id, products: products, totalCost: totalCost, totalProductNumber: totalProductNumber, address: address
    })
    dbproduct.save((err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result) {
                res.status(200).send({
                    message: 'success',
                    result: result
                })
            }
        }
    })
    // console.log(req.body)
})

router.get('/lastOrdered/:id', (req, res) => {
    const id = req.params.id;
    Products.find({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result)
        }
    })
})

router.post('/signup', (req, res) => {
    let userData = req.body;
    console.log(userData)
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (user) {
            res.status(401).send('Email Already Present');
        } else {
            let user = new User(userData);
            user.save((err, registerUser) => {
                if (err) {
                    console.log(err);
                } else {
                    async function main() {
                        // Generate test SMTP service account from ethereal.email
                        // Only needed if you don't have a real mail account for testing
                        // let testAccount = await nodemailer.createTestAccount();

                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for 465, false for other ports
                            auth: {
                                user: 'sender@gmail.com', // generated ethereal user
                                pass: 'password', // generated ethereal password
                            },
                        });

                        // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: '"Team 5Star" <sender@gmail.com>', // sender address
                            to: userData.email, // list of receivers
                            subject: "Registration Message", // Subject line
                            //   text: "Hello world?", // plain text body
                            html: "<b>Thank you for registration</b>", // html body
                        });

                        console.log("Message sent: %s", info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                        // Preview only available when sending through an Ethereal account
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                    }
                    main().catch(console.error);
                    res.status(200).send(registerUser)
                }
            })
        }
    })

})


router.post('/login', (req, res) => {
    const userData = req.body;
    User.findOne({ email: userData.email }, (err, user) => {
        if (err) {
            console.log(err);
        }
        if (!user) {
            res.status(401).send('Email Address not found!');
        } else {
            if (user.password !== userData.password) {
                res.status(401).send('Wrong Password')
            } else {
                let payload = { subject: user._id }
                let token = jwt.sign(payload, 'secretKey');
                res.status(200).send({ token: token, user_id: user._id })
            }
        }
    })
})



router.post('/address/:id', (req, res) => {
    const user_id = req.params.id;
    const name = req.body.name;
    const phone = req.body.phone;
    const address = req.body.address;
    const country = req.body.country;
    const state = req.body.state;
    const pincode = req.body.pincode;
    let billingAddress = new Address({
        user_id: user_id, name: name, phone: phone, address: address, country: country, state: state, pincode: pincode
    })
    billingAddress.save((err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send(result);
        }
    })
    // Address.findOne({ user_id: user_id }, (err, user) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //     if (user) {
    //         res.status(200).send({ message: 'Address found', address: user })
    //     } else {
    //         let billingAddress = new Address({
    //             user_id: user_id, name: name, phone: phone, address: address, country: country, state: state, pincode: pincode
    //         })
    //         billingAddress.save((err, result) => {
    //             if (err) {
    //                 console.log(err);
    //             } else {
    //                 res.status(200).send('success');
    //             }
    //         })
    //     }
    // })
})

router.put('/user-image/:id',storage, (req,res)=>{
    const imagePath = 'http://localhost:3000/images/' + req.file.filename;
    User.findByIdAndUpdate(req.params.id , {imagePath:imagePath} , (err , result)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(result)
        }
    })
})


router.put('/user-update/:id', (req, res) => {
    const { name, email, phone, gender, dob, address } = req.body;
    User.findByIdAndUpdate(req.params.id, { name: name, email: email, phone: phone, gender: gender, dob: dob, address: address }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result) {
                res.status(200).send('success')
            } else {
                res.status(401).send('Not')
            }
        }
    })
    // res.send('hi')
})


router.get('/orderedProducts/:id', (req, res) => {
    Products.find({ user_id: req.params.id }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(401).send('ERROR')
            }
        }
    })
    // res.status(200).send('hi')
})


router.get('/address/:id', (req, res) => {
    const user_id = req.params.id;
    Address.find({ user_id: user_id }, (err, add) => {
        if (err) {
            console.log(err);
        } else {
            if (add) {
                res.status(200).send(add)
            }
        }
    })
})


router.get('/filterCategory/:id', (req, res) => {
    if (req.params.id !== 'All Category') {
        let filterProducts = data.allProducts.filter((item) => item.category === req.params.id);
        if (filterProducts) {
            res.status(200).send(filterProducts)
        } else {
            res.status(401).send('Not found');
        }
    }else{
        res.status(200).send(data.allProducts)
    }
})

router.get('/filterWithPrice/:price' , (req,res)=>{
    let filterProducts = data.allProducts.filter((item)=>item.price <= req.params.price);
    if(filterProducts){
        res.status(200).send(filterProducts);
    }else{
        res.status(401).send('not found');
    }
})



// router.post('/address/:id', (req, res) => {
//     const user_id = req.params.id;
//     console.log(req.body);
//     // Address.findOne({ user_id: user_id }, (err, add) => {
//     //     if (err) {
//     //         console.log(err)
//     //     }
//     //     if (add) {
//     //         res.status(200).send('Address found');
//     //     } else {
//     //         const { name, phone, address, pinCode } = req.body;
//     //         let user = new Address({ user_id: user_id, name: name, phone: phone, address: address, pinCode: pinCode })
//     //         user.save((err, user) => {
//     //             if (err) {
//     //                 console.log(err);
//     //             } else {
//     //                 console.log(user);
//     //                 if (user) {
//     //                     res.status(200).send('Success');
//     //                 } else {
//     //                     res.status(401).send('Error');
//     //                 }
//     //             }
//     //         })
//     //     }
//     // })
// })

router.delete('/delete/:id', (req, res) => {
    Address.findOneAndDelete({ _id: req.params.id }, (err, del) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).send('Deleted');
        }
    })
})




router.get('/user-profile/:id', (req, res) => {
    console.log(req.params.id);
    User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            console.log(err);
        } else {
            if (user) {
                res.status(200).send(user)
            } else {
                res.status(401).send('not found');
            }
        }
    })
    // Address.findOne({user_id:req.params.id} , (err , add)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         if(add){
    //             res.status(200).send(add);
    //         }else{
    //             res.status(401).send('not found');
    //         }
    //     }
    // })
})



module.exports = router;
