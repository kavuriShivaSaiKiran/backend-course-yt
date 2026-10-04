import { db } from "../prisma/db.js"

const addToWatchList = async(req, res) => {
    const {movieId, status, rating, notes} = req.body

    //  check if the movie exists
    const movie = await db.orm.public.Movie.first({ id: movieId });

    if( !movie ){
        return res.status(404).json({error: "movie not found"})
    }

    //  check if already added
    const existingWatchlist = await db.orm.public.WatchListItem.first({ userId: req.user.id , movieId });


    if (existingWatchlist){
        return res.status(400).json({ error: "Movie is already present in the watchlist" })
    }
    
    const WatchListItem = await db.orm.public.WatchListItem.create({
        userId :  req.user.id , movieId, status: status || "PLANNED", rating, notes
    })

    res.status(201).json({
        status: "Success",
        data: {WatchListItem}
    })

}

export {addToWatchList}
