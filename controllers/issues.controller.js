// This Controller will treat about Issues sent by Users in Report Tab in Profile Page.
const db = require('../database/models')
const Issue = db.Issue;


exports.createIssue = async(req,res)=>{

    console.table(req.body);

    const {title, description, category, email} = req.body;
    await Issue.create({title, description, category, email})
    .then(data=>{res.json({OK:'Great'})})
    .catch(err=>{res.status(500).json({status: 'error', message: err||"Something went wrong while sending issues."})});

};