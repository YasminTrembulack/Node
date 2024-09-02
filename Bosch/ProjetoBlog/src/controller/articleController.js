const Article = require("../model/article");
const { Comment } = require('../model/comment')

class ArticleController {

    // static createLog(error){
    //     const timestamp = Date.now();
    //     const archivePath = path.resolve(__dirname, '..', `logs-${timestamp}.txt`);
    //     const errorString = JSON.stringify(error.message);

    //     fs.writeFile(archivePath, errorString, function(err, result) {
    //         if(err) console.log(err);
    //     });
    // }
    
    static async create(req, res)
    {
        const { title, text } = req.body;
        const authorId = req.authorId;
        
        if(!title || !text ) return res.status(400).send({ message: "os campos não podem estarem vazios " });
        if(title.length < 3) return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });
        if(text.length < 15) return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });

        const article = {
            title,
            text,
            author: authorId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        };

        try {
            const result = await Article.create(article);
            return res.status(201).send({ id:result._id,  message: "Artigo criado com sucesso" });
        } catch (error) {
            // ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async likeArticle(req, res){
        const { id } = req.params;

        if(!id) return res.status(400).send({ message: "No id provider" });

        try {
            const article = await Article.findById(id);
            if (!article) return res.status(400).send({ message: "Article not found" });
            
            if (article.likes.includes(req.userId)){
                await Article.findByIdAndUpdate({_id: id}, { $pull: { likes: req.userId } });
                return res.status(200).send({ message: 'User disliked'});
            }
                
            await Article.findByIdAndUpdate({_id: id}, { $push: { likes: req.userId } });
            return res.status(200).send({ message: 'User liked'});
        } catch (error) {
            // ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao curtir", data: error.message });
        }
    };

    static async commentArticle(req, res){
        const { id } = req.params;
        const { content } = req.body;

        if(!id) return res.status(400).send({ message: "No id provider" });

        const comment = {
            user: req.userId,
            content,
            createdAt: Date.now()
        }

        try {
            const article = await Article.findById(id);
            if (!article) return res.status(400).send({ message: "Article not found" });

            const newComment = await Comment.create(comment);

            await Article.findByIdAndUpdate({_id: id}, { $push: { comments: newComment._id } });
            return res.status(200).send({ message: 'Commented post with success'});
        } catch (error) {
            // ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao comentar", data: error.message });
        }
    };

    static async getComments(req, res){
        const { id } = req.params;

        if(!id) return res.status(400).send({ message: "No id provider" });

        try {
            const article = await Article.findById(id).populate('comments.user');
        if (!article) {
            throw new Error('Article not found');
        }

        const commentDetails = await Promise.all(article.comments.map(async (comment) => {
            // Se a referência do comentário já está embutida no artigo, você não precisa buscar novamente
            // Se você realmente precisa buscar os comentários individualmente
            return {
                user: comment.user,  // Se você quer dados do usuário, já está na propriedade 'user' por causa do populate
                content: comment.content
            };
        }))

        console.log(commentDetails);
        
        
        return res.status(200).send({ body: article.comments });

        } catch (error) {
            // ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao comentar", data: error.message });
        }
    };

    static async delete(req, res){
        const { id } = req.params;

        if(!id) return res.status(400).send({ message: "No id provider" });

        const article = await Article.findById(id);
        if (!article) return res.status(400).send({ message: "Article not found" });
        if (article.author != req.authorId) return res.status(401).json({ message: 'Você não tem permissão para delatar esse artigo' });

        try {
            await Article.deleteOne({_id: id});
            return res.status(200).send({ message: 'Artigo deletado.'});
        } catch (error) {
            return res.status(500).send({ error: "Falha ao deletar", data: error.message });
        }
    }
}

module.exports = ArticleController;