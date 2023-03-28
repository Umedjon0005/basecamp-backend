import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try{
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
}

export const create = async (req, res) => {
    try{
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,    
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать статью',
        });
    }
};

export const getOne = async (req, res) => {
    try{
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate({
            _id: postId,
        }, {
            $inc: { viewsCount: 1 },
        },
        {
            returnDocument: 'after',
        }
    ).populate('user').then((doc) => res.json(doc))
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    })

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const remove = async (req, res) => {
    try{
        const postId = req.params.id;
        PostModel.findOneAndDelete({
            _id: postId,
        })
        .then(doc => res.json(doc))
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                message: 'Не удалось удалить статью'
            });
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить статьи',
        });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne({
            _id: postId
        }, 
        {
            title: req.body.title,
            text: req.body.text,    
            user: req.userId,
        });

        res.json({
            success: true,
        })
    }   

    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить статью',
        });
    }
}