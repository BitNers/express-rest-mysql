module.exports = (app)=>{
    const issueControl = require("../controllers/issues.controller");
    app.post('/issues', issueControl.createIssue);
}