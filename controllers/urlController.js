const Url = require('../models/url')
const crypto = require('crypto')

const getUrl = async(req,res)=>{
  const urlId = req.params.urlId
  const url = await Url.findOne({shortUrl: urlId}) 
  res.status(200).redirect(url.originalUrl)
}

const createUrl = async (req,res)=>{
  const newId = crypto.randomBytes(5).toString('hex')
  const originalUrl = req.body.originalUrl
  const newUrlId = await Url.create({
    originalUrl: originalUrl, 
    shortUrl: newId
  })
  res.status(200).json({msg:'Succesfully created a url-ID', shorterUrl: newUrlId} )
}

module.exports = {getUrl,createUrl}