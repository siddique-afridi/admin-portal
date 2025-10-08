
const updateValidator = (req, res, next)=> {
    const {name, rollNo, class:studentClass, age, gender, contact, details} = req.body;
    let errors = [];

    if (name && typeof name !== "string") errors.push("Name must be a string");
    if (rollNo && typeof rollNo !== "number") errors.push("Roll number must be a number");

    if (studentClass && typeof studentClass!=="string") errors.push("Class must be a string");
    if (age &&( typeof age !=="number" || age<5 || age>25)) errors.push("Age must be a number and between 5 to 25");

    if (gender && !["male", "female", "other"].includes(gender)) errors.push("Gender must be male,female or other");
    if (contact && !/^[0-9]+$/.test(contact)) errors.push("Contact must contains digits only");

    if (details){
        if(details.city && typeof details.city !=="string") errors.push("City must be a string");
        if(details.profession && typeof details.profession !=="string") errors.push("Profession must be a string");
    }

    if (errors.length>0){
        return res.status(400).json({errors});
    }
    
    next();
}

module.exports = updateValidator;