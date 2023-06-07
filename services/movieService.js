const  MovieModel = require("../dbModels/movie")
exports.createMovieIfNotExists = async (payload)=>{
    const movieExists = await MovieModel.findOne({id:payload.imdbID})
    if(movieExists!==null)return movieExists;
    return await MovieModel.create({id:payload.imdbID,title:payload.Title,year:payload.Year,poster:payload.Poster,upvote:0,downvote:0});
};

exports.vote = async (payload)=>{
    console.log(payload)
    await this.createMovieIfNotExists(payload.movie)
    const filter = { id: payload.movie.imdbID };
    let update = null
    if (payload.voteType=="upvote")
        update= { $inc: { upvote: 1 } };
    else 
        update= { $inc: { downvote: 1 } };

   await MovieModel.updateOne(filter, update);
}