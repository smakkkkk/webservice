const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')


// get all events
const getAllEvents = asyncHandler(async (req, res) => {
    const events = await Event.find()
    res.status(200).json(events)
})


// get one event
const getEventById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such event!"})
    }

    const event = await Event.findById(id)
    if (!event){
        return res.status(404).json({error: "No such event!"})
    }
    res.status(200).json(event)
})

module.exports = {
    getAllEvents,
    getEventById,
    
}