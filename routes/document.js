const express = require("express");
const Document = require("../models/document");
const auth = require("../middlewares/auth");

const documentRouter = express.Router();

documentRouter.post("/api/v1/docs/create", auth, async (req, res) => {
    try {
        const { createdAt } = req.body;
        let document = new Document({
            uid: req.user,
            title: "Untitled Document",
            createdAt: createdAt,
        });

        document = await document.save();

        res.json(document);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
});

documentRouter.get("/api/v1/docs/me", auth, async (req, res) => {
    try {
        let documents = await Document.find({ uid: req.user })
        res.json(documents);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

documentRouter.post("/api/v1/docs/title", auth, async (req, res) => {
    try {
        const { id, title } = req.body;
        let document = await Document.findByIdAndUpdate(id, { title })
        res.json(document);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})


documentRouter.get("/api/v1/docs/:id", auth, async (req, res) => {
    try {
        let document = await Document.findById(req.params.id)
        res.json(document);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
})

module.exports = documentRouter;

