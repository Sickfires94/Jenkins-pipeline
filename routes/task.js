const Users = require("../models/User");
const Tasks = require("../models/Task");
var express = require("express");
const jwt = require("jsonwebtoken")
var router = express.Router();



router.post("/getByTitle", async (req, res) => {
    try {
        console.log("USER FOUND = " + req.user.email)
        const task = await Tasks.findOne({ title: req.body.title })
        if (!task) return res.json({ msg: "TASK NOT FOUND" })
        res.json({ msg: "TASK FOUND", data: task })
    }
    catch (error) {
        console.error(error);
    }
});

router.post("/getAll", async (req, res) => {
    try {
        console.log("USER FOUND = " + req.user.email)
        const user = await Users.find({ email: req.user.email })
        const task = await Tasks.find({ user: user })
        res.json({ msg: "TASKS FOUND", data: task })
    }
    catch (error) {
        console.error(error);
    }
});


router.post("/getByTitleWithUser", async (req, res) => {
    try {
        const task = await Tasks.find({ title: req.body.title }).populate("user")
        if (!task) return res.json({ msg: "TASK NOT FOUND" })
        res.json({ msg: "TASK FOUND", data: task })
    }
    catch (error) {
        console.error(error)
    }
});


router.post("/addTask", async (req, res) => {
    try {

        const user = await Users.findOne({ email: req.user.email })
        if (!user) return res.json({ msg: "USER NOT FOUND" })

        const task = await Tasks.findOne({ title: req.body.title })
        if (task) return res.json({ msg: "TASK ALREADY EXISTS" })
        await Tasks.create({ ...req.body, user: user._id })
        res.json({ msg: "TASK ADDED" })
    }
    catch (error) {
        console.error(error)
    }
});



router.post("/deleteByTitle", async (req, res) => {
    try {
        const task = await Tasks.findOne({ title: req.body.title })
        if (!task) return res.json({ msg: "TASK NOT FOUND" })
        await Tasks.deleteOne({ task: req.body.task })
        res.json({ msg: "TASK DELETED" })
    }
    catch (error) {
        console.error(error)
    }
});



router.post("/deleteAllByStatus", async (req, res) => {
    try {
        const task = await Tasks.find({ title: req.body.status })
        if (!task) return res.json({ msg: "TASK NOT FOUND" })
        await Tasks.deleteOne({ task: req.body.task })
        res.json({ msg: "TASK/TASKS DELETED" })
    }
    catch (error) {
        console.error(error)
    }
});


router.post("/deleteAll", async (req, res) => {
    try {
        await Tasks.deleteMany({})
        res.json({ msg: "TASK/TASKS DELETED" })
    }
    catch (error) {
        console.error(error)
    }
});

router.post("/updateDescription", async (req, res) => {
    try {
        // const task = await Tasks.findOne({title: req.body.title})
        // if (!task) return res.json({msg:"TASK NOT FOUND"})
        await Tasks.findOneAndUpdate({ title: req.body.title }, { description: req.body.description })
        res.json({ msg: "TASK DESCRIPTION UPDATED" })
    }
    catch (error) {
        console.error(error)
    }
});

router.post("/updateStatus", async (req, res) => {
    try {
        // const task = await Tasks.findOne({title: req.body.title})
        // if (!task) return res.json({msg:"TASK NOT FOUND"})
        await Tasks.findOneAndUpdate({ title: req.body.title }, { description: req.body.status })
        res.json({ msg: "TASK STATUS UPDATED" })
    }
    catch (error) {
        console.error(error)
    }
});



module.exports = router
