module.exports=(app)=> {

    const controller =require('../controllers/user.controller')
    app.post('/inscription' ,controller.register);
    app.post('/authentification',controller.login)
    
}
