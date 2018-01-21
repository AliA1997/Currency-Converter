//Invoke the module
const currencyConverter = require('./currency.js');
//Invoke the queries and amount using the command line host process object argv property.
const query1 = process.argv[2].toUpperCase();
const query2 = process.argv[3].toUpperCase();
const amount = process.argv[4];
//Convert the queries and amount.
currencyConverter.convert(query1, query2, amount); 