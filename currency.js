//Invoke important variable used in the application.
const api = require('./api.json');
const http = require('http');
const cc = require('currency-codes');
const url = 'http://www.apilayer.net/api/live?source=USD&access_key=' + api.key + '&format=1';
const countries = cc.countries();
const ccCodes = cc.codes();
/* Check if the importation of the api key is working.
console.log(api.key);
*/
function printError(error) {
    console.error(error.message);
}
//Invoke a country name to a code.
function getCode(country) {
    country = country.toUpperCase();
    if(ccCodes.includes(country)) {
        //If it is a code, return the country code. 
        return country;
    } else {
        //If user input countries name, just retrieve the code using the currency-codes module.
        const countryObj = cc.country(country.toLowerCase());
        const ccCode = countryObj[0].code;
        return ccCode;
    }
}
//Invoke the calculateObject to calculate the given user query and json object. 
function calculateObject(userCountry, opposingCountry, obj, amount) {
        try {
            const uc = getCode(userCountry);
            const oc = getCode(opposingCountry);
            //If given the correct country code just multiply the currency rate by amount.
            const total =  obj.quotes[uc + oc] * amount;
            return total;
        } catch(error) {
            printError(error);
    }
}
//Define the function defines the functionality of the app.
function currencyConvert(userCountry='JPY', opposingCountry='USD', amount=200) {
    userCountry = getCode(userCountry);
    opposingCountry  = getCode(opposingCountry);
    const request = http.get('http://www.apilayer.net/api/live?source=' + userCountry + '&access_key=' + api.key + '&format=1', response => {
        let buffer = '';
        response.on('data', chunk => {
            //Retrieve Data
            buffer += chunk.toString();
        })
        response.on('end', () => {
            try {
            //Parse Data
            const object = JSON.parse(buffer);
            //Calculate Data
            console.log(calculateObject(userCountry, opposingCountry, object, amount));
            } catch(error) {
                const errorMessage = new Error('Trouble parsing data ', error.message);
                printError(errorMessage);
            }
        }).on('error', printError);
    });
    request.on('error', printError);
}
/*Test the function before exporting it. 
currencyConvert('usd', 'all', 100);
*/
module.exports.convert = currencyConvert;