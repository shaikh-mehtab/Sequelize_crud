const express = require("express");
const router = express.Router();
const Task = require('./model');

router.get('/todos', async (req, res) => {
    try {
        const tasks = await Task.findAll();

        if (tasks.length > 0) {
            res.status(200).json({
                status: true,
                data: tasks
            });
        } else {
            res.status(404).json({
                status: false,
                message: "Record Not Found"
            });
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

router.post('/todos', async (req, res) => {
    try {
        const { content, description } = req.body;

        const tasks = Task.build({
            'content': content,
            'description': description
        });

        await tasks.save();

        res.status(200).json({
            status: true,
            data: tasks
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

})

router.get('/todo/:id', async (req, res) => {
    try {
        const tasks = await Task.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tasks) {
            return res.status(404).json({
                status: false,
                message: "Id Not Found"
            })
        } else {
            res.status(200).json({
                status: true,
                data: tasks
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
})

router.put('/todo/:id', async(req, res) => {
    try {
        const tasks = await Task.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tasks) {
            return res.status(404).json({
                status: false,
                message: "Id Not Found"
            })
        }

        const { content, description, is_complete } = req.body;

        await tasks.set({
            'content': content,
            'description': description,
            'is_complete': is_complete

        })

        await tasks.save();

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }

})

router.delete('/todo/:id', async (req, res) => {
    try {
        const tasks = await Task.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!tasks) {
            return res.status(404).json({
                status: false,
                message: "Id Not Found"
            })
        }

        await tasks.destroy();

        res.status(200).json({
            message: "Delete Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router

