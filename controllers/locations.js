const Location = require('../models/location');
const S3 = require('aws-sdk/clients/s3');
const { v4: uuidv4 } = require('uuid');
const s3 = new S3();



const create = async (req, res) => {
    console.log(req.body, 'this is create method', req.user)
    try {
        // const filePath = `${uuidv4()}/${req.file.originalname}`
        // const params = { Bucket: process.env.BUCKET_NAME, Key: filePath, Body: req.file.buffer };
        // s3.upload(params, async function(err, data){
        // console.log(err, ' from aws')
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
        const posts = await Location.find({}).populate('user').exec()
        res.status(200).json({ posts })
    } catch (err) {

    }
}

module.exports = {
    create,
    index
}