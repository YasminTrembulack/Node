const Article = require("../model/article");
const { Comment } = require('../model/comment')
const { Author } = require('../model/author')

class CommentController {

    static async commentArticle(req, res){
        const { id } = req.params;
        const { content } = req.body;

        if(!id) return res.status(400).send({ message: "No id provider" });

        try {
            const article = await Article.findById(id);
            if (!article) return res.status(400).send({ message: "Article not found" });
            
            const comment = {
                article: id,
                author: req.authorId,
                content,
                createdAt: Date.now()
            }

            const newComment = await Comment.create(comment);

            await Article.findByIdAndUpdate({_id: id}, { $push: { comments: newComment._id } });
            return res.status(200).send({ message: 'Commented post with success'});
        } catch (error) {
            return res.status(500).send({ error: "Falha ao comentar", data: error.message });
        }
    }

    static async getComments(req, res){
        const { id } = req.params;

        if(!id) return res.status(400).send({ message: "No id provider" });

        try {
            const comments = await Comment.find({article: id});
            if(!comments) return res.status(200).send({ message: "No comments found", body: comments });
            
            var result = [];

            comments.forEach(async c => { 
                var aut = await Author.find({article: c.author});
                result.push({
                    _id: c._id,
                    author: aut,
                    content: c.content,
                    createdAt: c.createdAt
                });
            });

            return res.status(200).send({ message: "Comments found", body: result });
            
        } catch (error) {
            return res.status(500).send({ error: "Falha ao buscar comentarios", data: error.message });
        }
    }
}
module.exports = CommentController;