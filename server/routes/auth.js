const {
    Router
} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const {
    check,
    validationResult
} = require('express-validator');
const router = Router();
const jwt = require('jsonwebtoken')

// /api/auth/register
router.post('/register',
    [
        check('login', 'not correct email').isEmail(),
        check('password', 'Min length 6 characters').isLength({
            options: {
                min: 6
            }
        })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
           if (!errors.isEmpty()) {

                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not correct data during registration'
                })
            }

            const {
                login,  
                password
            } = req.body;

            const candidate = await User.findOne({
                login: login
            })

            if (candidate) {
                return res.status(400).json({
                    message: 'Already exist'
                })
            }
            

            const hashedPassword = await bcrypt.hash(password, 8);
            const user = new User({
                login,
                password: hashedPassword
            });

            await user.save()

            res.status(201).json({
                message: 'User created'
            });


        } catch (e) {
            res.status(500).json({
                message: "Not found"
            })
        }

    })


// /api/auth/login
router.post('/login',
    [
        check('login', 'not correct email').normalizeEmail().isEmail(),
        check('password', 'Min length 6 characters').isLength({
            options: {
                min: 6
            }
        })
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not correct data during login'
                })
            }

            const {
                login,
                password
            } = req.body;

            const user = await User.findOne({
                login: login
            })

            if (!user) {
                return res.status(400).json({
                    message: 'Cant find user'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({message:'Not correct password'})
            }
            const token= jwt.sign({
                userId: user.id
            },
            config.get('jwtSecret'),
            {expiresIn:'24h'}
            )

            res.json({token, userId:user.id})
        } catch (e) {
            res.status(500).json({
                message: 'error'
            })
        }
    })

    router.get('/user/:id',auth, async(req,res)=>{
        try{
            const user = await User.findById(req.params.id) ;
            res.json(user.login);
        } catch (e){
            res.status(500).json({message: e})
        }
    });
    


module.exports = router


