import { validationResult ,body } from "express-validator" 


const  Validate=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();

}



export const registerUserValidation=[

    body('email').isEmail().withMessage('Invalid Email Address'),

    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').notEmpty().withMessage('First Name is required'),

    Validate

]


export const loginUserValidation=[
    body('email').isEmail().withMessage('Invalid Email Address'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    Validate
]
