const express = require('express');
const router = express.Router();
const EventModel = require('../models/EventModel');
const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const rolesAbleToApprove = ['admin'];
const rolesAbleToAdd = ['admin', 'editor'];

(resetEventsShown = async () => {
  await EventModel.updateMany({}, {$set: {hasBeenGloballyShown: false}})
})()

// these two are outside in order to be static (since no static in JS)
let todayEvent = undefined;
let todayDate = new Date().toDateString();

router.get('/daily', async (req, res, next) => {
  if (todayEvent && (todayDate === new Date().toDateString())) {
    return res.json({status: 'ok', data: todayEvent});
  } else {
    todayDate = new Date().toDateString();
    try {
      let newEvent = await EventModel.findOne({dateToBeShown: todayDate, hasBeenApproved: true, hasBeenGloballyShown: false});
      if (newEvent) {
        todayEvent = newEvent;
        await EventModel.updateOne({customId: todayEvent.customId}, {hasBeenGloballyShown: true});
      } else {
        newEvent = await EventModel.findOne({dateToBeShown: null, hasBeenApproved: true, hasBeenGloballyShown: false})
        todayEvent = newEvent;
        await EventModel.updateOne({customId: todayEvent.customId}, {hasBeenGloballyShown: true});
      }
    } catch(err) {
      console.log(err);
      return res.json({status: 'error', error: 'Event could not be fetched.'})
    }
    return res.json({status: 'ok', data: todayEvent})
  }
  return res.json('fk this shit');
});

router.get('/:customId', async (req, res, next) => {
  try {
    const customId = req.params.customId;
    const theEvent = await EventModel.findOne({customId});
    if (theEvent !== null) {
      return res.json({status: 'ok', data: theEvent});
    } else {
      return res.json({
        status: 'error',
        error: `Event with ID ${customId} does not exist.`,
      });
    }
  } catch (err) {
    return res.json({
      status: 'error',
      error: 'Error fetching event from database.',
    });
  }
});

router.post('/add', async (req, res, next) => {
  const {title, text, dateToBeShown, token} = req.body;
  if (jwt.verify(token, JWT_SECRET)) {
    const {username, role} = jwt.decode(token);
    if (rolesAbleToAdd.includes(role)) {
      const lastEvent = await EventModel.find()
        .sort({customId: -1})
        .limit(1)
        .lean();
      const customId = lastEvent.length === 1 ? lastEvent[0].customId + 1 : 1;
      try {
        await EventModel.create({
          customId: customId,
          title: title,
          text: text,
          dateAdded: new Date(),
          dateToBeShown: dateToBeShown,
          author: username,
          hasBeenApproved: false,
          hasBeenGloballyShown: false
        });
        return res.json({status: 'ok', data: 'Event created successfully.'});
      } catch (err) {
        console.log(err);
        return res.json({
          status: 'error',
          error: 'Something went wrong. Please, try again later.',
        });
      }
    } else {
      return res.json({
        status: 'error',
        error: 'You are not authorized to add an event.',
      });
    }
  } else {
    return res.json({
      status: 'error',
      error: 'It seems your JWT is corrupted.',
    });
  }
});

router.post('/delete/:customId', async (req, res, next) => {
  const customId = req.params.customId;
  try {
    await EventModel.deleteOne({customId});
  } catch (err) {
    console.log(error);
    return res.json({status: 'error', error: 'something went wrong'});
  }
  return res.json({status: 'ok', data: 'event deleted successfully'});
});

router.post('/edit/:customId', async (req, res, next) => {
  const customId = req.params.customId;
  const body = req.body;
  try {
    await EventModel.updateOne({customId}, body);
    return res.json({status: 'ok', data: 'Evant updated successfully.'});
  } catch (err) {
    console.log(err);
    return res.json({
      status: 'error',
      error: 'Event could not be updated, please try again.',
    });
  }
});

router.post('/approve', async (req, res, next) => {
  const {eventToApprove, token} = req.body;
  // const [header, body, signature] = token.split('.');
  if (jwt.verify(token, JWT_SECRET)) {
    const {role} = jwt.decode(token);
    if (rolesAbleToApprove.includes(role)) {
      try {
        const updatedEvent = await EventModel.updateOne(
          {customId: eventToApprove},
          {hasBeenApproved: true}
        );
        if (updatedEvent.nModified === 0) {
          return res.json({
            status: 'error',
            data: 'The event had already been approved.',
          });
        }
        return res.json({status: 'ok', data: 'Event has been approved.'});
      } catch (err) {
        console.log(err);
        return res.json({
          status: 'error',
          error: 'Event could not be approved, try again later.',
        });
      }
    } else {
      return res.json({
        status: 'error',
        error: 'You are not authorized to approve an event.',
      });
    }
  }
  return res.json({status: 'error', error: 'Your JWT seems corrupted.'});
});

module.exports = router;
