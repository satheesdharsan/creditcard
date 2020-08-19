const axios = require('axios');

// To get the decision response from decision check microservices 
// where it provide service decision as Barclay,Vanquis and not eligible

exports.check = function (req, res, next) {
  const formData = req.body;

  let data = {
    FirstName : formData.firstName,
    LastName : formData.lastName,
    DateOfBirth : formData.dob,
    Salary : formData.income
  } 

  axios({
    method: 'post',
    url: 'http://localhost:8080/api/Customers',
    data: data,
    headers: {'Content-Type': 'application/json; charset=utf-8' }
    })
    .then(response => {

    let serviceDecision = '';
    let serviceAPR = '';
    let cardType = '';
    let promotionMsg = '';
    let purChaseRate = '';
    let creditLimit = '';

    if(response.data.isEligible)
    {
      serviceDecision = 'Eligible';
      serviceAPR = response.data.customerCard.apr;
      cardType = response.data.customerCard.bankName;
      promotionMsg = response.data.customerCard.promotionMsg;
      purChaseRate = response.data.customerCard.purChaseRate;
      creditLimit = response.data.customerCard.creditLimit;
    }
    else{
      serviceDecision = 'NotEligible';
    }
    
    res.status(200).send({
    firstName: response.data.firstName,
    lastName: response.data.lastName,
    dob: response.data.dateOfBirth,
    income: response.data.salary,
    timestampLog: response.data.createdOn,
    serviceDecision: serviceDecision,
    apr: serviceAPR,
    cardType: cardType,
    promotionMsg: promotionMsg,
    purChaseRate: purChaseRate,
    creditLimit: creditLimit
    });    
  })
  .catch((error) => {
      console.log(error)
      res.status(500).send({apiErrorMessage: 'Internal Server Error'})
  });
  
  /*
 res.status(200).send({
  firstName: formData.firstName,
  lastName: formData.lastName,
  dob: formData.dob,
  income: formData.income,
  timestampLog: "27/07/2019 13:36:47 GMT+0100",
  serviceDecision: "Eligible",
  apr: "31.8",
  cardType: "Vanquis",
  promotionMsg: "0% interest balance transfer and purchases for up to 24 months. *Any introductory balance transfer offer must be made within the first 60 days of account opening for new customers.",
  purChaseRate: "31.84",
  creditLimit: "1,000"
  });    
  */
  
}