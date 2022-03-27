const User =require('../models/user.model');
const bcrypt = require('bcryptjs') 
exports.register=(req,res)=>{
    User.findOne({email : req.body.email})
    .then (user=>{
        if(this.user){
            res.send({"message" :"email exist"})
    
        }else{
        const new_user=new User(req.body);
        bcrypt.genSalt(15,(err,key)=>{ 
            bcrypt.hash(req.body.password,key ,(error ,crypt_pass)=>{
                new_user.password=crypt_pass ; 
                new_user.save()
                .then(data => {
                    res.send(data)
                })

            }
            )
        }
     
        )
    }
})
}  


exports.login=(req,res)=>
{
     User.findOne({email : req.body.email},(err,user)=>
    {
        if(!user)
         {
           res.send({"message" : "email invalid"});

         }else
            {
                //test password validation 
                bcrypt.compare(req.body.password , user.password,(err,isMatch)=>
                { 
                //if password invalid is match==false 
                    if(!isMatch){
                        res.send({"messsage" :"password invalid"})
                    }else {
                        res.send(user)
                    }

                })
        
            }
    })  
}
