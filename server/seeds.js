var customers = 
[{"name":"Shell","collection":"Shell"},
{"name":"Esso","collection":"Esso"},
{"name":"BP","collection":"BP"}];

if (customerList.find().count() === 0){ 
  _.each(customers, function(customer){
    customerList.insert(customer);
    console.log("Inserted "+ customer.name);
  })
}


