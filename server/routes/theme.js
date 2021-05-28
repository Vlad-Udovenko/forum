const {Router, request} = require('express');
const Theme = require('../models/Theme');
const auth = require('../middleware/auth.middleware')
const router = Router();

router.post('/generate', auth, async (req,res)=>{
    try{
        const {topic, text} = req.body;
        const theme = new Theme ({topic,text,owner:req.user.userId})
        await theme.save();
        res.status(201).json({theme});
    } catch (e){
        res.status(500).json({message: 'Something wrong, try again'})
    }
});

router.get('/',auth, async(req,res)=>{
    try{
        const {page=1, limit = 1000} = req.query;
        const themes = await await Theme.find().limit(limit *1).skip((page-1)*limit);
        res.status(200).json(themes);

    } catch (e){
        res.status(500).json({message: 'Something wrong, try again'})
    }
});


router.get('/:id',auth, async(req,res)=>{
    try{
        const theme = await Theme.findById(req.params.id) ;
        
        res.status(201).json({theme});
    } catch (e){
        res.status(500).json({message: 'Something wrong, try again'})
    }
})

router.delete('/:id',auth, async(req,res)=>{
    try{
        const theme = await Theme.findByIdAndRemove(req.params.id) ;
        res.status(204).json({message: 'Deleted'});
    } catch (e){
        res.status(500).json({message: 'Something wrong, try again'})
    }
})



router.put('/:id/addcomment', auth, async (req, res) => {
    let comment = req.body.comment;
    let id = req.body.userId;
    let date =  req.body.date;
    let newComm = {comment, id, date};
    try{
        if(!comment||!id){
            res.status(500).json({message: 'Something wrong, try again'});
        }
        const theme = await Theme.findByIdAndUpdate(req.params.id,
            {
                $push:{"comments":newComm }
            });
        res.status(201).json({theme});
     } catch (e){
        res.status(500).json({message: 'Something wrong, try again'});
    }
  });
  

module.exports = router;