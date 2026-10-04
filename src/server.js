import express from "express"
import movieRoutes from "./routes/movieroutes.js"
import authRoutes from "./routes/authRoutes.js"
import watchListRoutes from "./routes/watchlistRoutes.js"
import { authMiddleware } from "./middleware/authMiddleware.js"
import 'temporal-polyfill/global';
import { gracefulShutdown } from "./prisma/db.js"

const app = express()

app.use(express.json())

app.use("/movies", movieRoutes)
app.use("/auth", authRoutes)
app.use("/watchlist", watchListRoutes)

app.listen(8080, () => {
    console.log("port is running on 8080")
})

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  gracefulShutdown('unhandledRejection', reason);
});

process.on('uncaughtException', (err) => {
  gracefulShutdown('uncaughtException', err);
});   