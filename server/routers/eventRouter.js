const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const EventModel = require('../models/EventModel');

router.get('/:customId', async (req, res, next) => {
  const customId = req.params.customId;
  const theEvent = await EventModel.findOne({customId})
  res.json({status: 'ok', data: theEvent})
})

router.post('/add', async (req, res, next) => {
  const {title, text, author} = req.body;
  const lastEvent = await EventModel.find().sort({customId:-1}).limit(1).lean();
  const customId = lastEvent.length === 1 ? lastEvent[0].customId+1 : 1;
  try {
    await EventModel.create({
      customId: customId,
      title: title,
      text: text,
      date: new Date(),
      author: author,
      hasBeenApproved: false,
    })
    return res.json({status: 'ok', data: 'event created successfully'})
  } catch(err) {
    console.log(err);
    return res.json({status: 'error', error: 'something went wrong'})
  }
})

router.post('/delete/:customId', async (req, res, next) => {
  const customId = req.params.customId;
  try {
    await EventModel.deleteOne({customId});
  } catch(err) {
    console.log(error);
    return res.json({status: 'error', error: 'something went wrong'})
  }
  return res.json({status: 'ok', data: 'event deleted successfully'})
})

router.post('/edit/:customId', async (req, res, next) => {
  const customId = req.params.customId;
  const body = req.body;
  console.log(body);
  try{
    await EventModel.updateOne({customId}, body);
    return res.json({status: 'ok', data: 'Evant updated successfully.'})
  } catch(err) {
    console.log(err);
    return res.json({status: 'error', error: 'Event could not be updated, please try again.'})
  }
})

module.exports = router;