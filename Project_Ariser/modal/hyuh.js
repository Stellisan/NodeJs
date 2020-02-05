let req = {};

    // C_NAME: req.body.CName,
    // C_ADDRESS_ONE: req.body.AddressOne,
    // C_ADDRESS_TWO: req.body.AddressTwo,
    // C_CITY: req.body.City,
    // C_PINCODE: req.body.Pincode,
    // C_PHONE_NO: req.body.Phoneno,
    // C_GSTIN: req.body.gstin

let bod = {
    CName : "Name",
    AddressOne: "Address One",
    AddressTwo: "Address Two",
    City: "City",
    Pincode: "232321",
    Phoneno: "1234567890",
    gstin:"GSTINTAXNO"}

req['body'] = bod

console.log(req);

console.log(req.body.CName);