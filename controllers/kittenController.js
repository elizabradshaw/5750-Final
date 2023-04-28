const axios = require('axios');

exports.getRandomKitten = async (req, res) => {
    const width = req.body.width || 200;
    const height = req.body.height || 300;
    const url = `http://placekitten.com/${width}/${height}`;
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');
        res.set('Content-Type', 'image/jpeg');
        res.send(imageBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting kitten image :(');
    }
};
