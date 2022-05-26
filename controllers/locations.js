const Location = require('../models/location');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();



const create = async (req, res) => {
    console.log(req.body, 'this is create method', req.user)
    try {
        const location = await Location.create({ location_description: req.body.description, longitude: req.body.longitude, latitude: req.body.latitude, zoom: req.body.zoom });
        console.log(location)
        // make sure the post we're sending back has the user populated
        await location.populate('user');
        res.status(201).json({ location: location })
        // })

    } catch (err) {
        console.log(err)
        res.json({ data: err })
    }
}

async function index(req, res) {
    try {
        // this populates the user when you find the posts
        const locations = await Location.find({}).populate('user').exec()
        res.status(200).json({ locations })
    } catch (err) {
        console.log(err)
    }
}

async function deleteLocation(req, res) {
    try {
        // this populates the user when you find the posts
        const locations = await Location.deleteOne({ 'location._id': req.params.id })
        res.status(200).json({ locations })
    } catch (err) {
        console.log(err)
    }
}

const addNote = async (req, res) => {
    console.log(req.body, 'createNote?', req.user)
    try {
        const location = await Location.findById(req.params.id);
        console.log(location)
        location.notes.push({ content: req.body.note, username: req.user.username, userId: req.user._id });
        await location.save()
        res.status(201).json({ data: 'note added' })
    } catch (err) {
        console.log(err)
        res.json({ data: err })
    }
}



module.exports = {
    create,
    index,
    deleteLocation,
    addNote
}