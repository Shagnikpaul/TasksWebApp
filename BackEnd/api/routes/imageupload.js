const router = require("express").Router();
var ImageKit = require("imagekit");



const imagekit = new ImageKit({
    urlEndpoint: process.env.imagekit_urlEndpoint,
    publicKey: process.env.imagekit_publicKey,
    privateKey: process.env.imagekit_privateKey
});




router.get('/auth', async (req, res) => {
    var result = imagekit.getAuthenticationParameters();
    res.send(result);
})

module.exports = router