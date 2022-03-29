const Joi = require('@hapi/joi');
//register validation
const loginvalidation = (data) => {
    const schema = Joi.object({
      /*  firstname: Joi.string()
        .min(6)
        .required(),
        lastname: Joi.string()
        .min(6)
        .required(), */
        Emailaddress: Joi.string()
        .min(6)
       // .required()
        .email(),
        Password: Joi.string()
        .min(8),
      //  .required(),
    });
    return schema.validate(data)


    //const { error } = await schema.validate(req.body);

}; 
const registrevalidation = (data) => {
    const schema = Joi.object({
        firstname: Joi.string()
        .min(6)
        .required(),
        lastname: Joi.string()
        .min(6)
        .required(),
        Emailaddress: Joi.string()
        .min(6)
        .required()
        .email(),
        Password: Joi.string()
        .min(8)
        .required(),
    });
    return schema.validate(data)

}
module.exports.registrevalidation = registrevalidation;
module.exports.loginvalidation = loginvalidation;