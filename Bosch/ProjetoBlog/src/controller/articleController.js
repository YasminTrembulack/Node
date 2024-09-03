const Article = require("../model/article");

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