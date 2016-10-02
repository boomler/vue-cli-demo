'use strict'
const nodemailer = require('nodemailer')
const mailTransport = nodemailer.createTransport('SMTP',{
	service:'hotmail',
	auth:{
		user:'boomler@hotmail.com',
		pass:'wanghao@'
	}
})
mailTransport.sendMail({
	form:'boomler',
	to:'wanghao@5271@gmail.com',
	substract:'test substract',
	text:'thank you for using our website'
},function(err){
	if(err)
		console.log(err)
})
