import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.json({message: "GET route"})
})
router.put("/", (req, res) => {
    res.json({message: "GET route"})
})
router.post("/", (req, res) => {
    res.json({message: "GET route"})
})
router.delete("/", (req, res) => {
    res.json({message: "GET route"})
})

export default router