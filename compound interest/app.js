// Importing necessary modules
const fs = require ('fs')


//Helper functions
let roundDecimal = (number)=> {
	return Math.round(number*100)/100
}
let addComas = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
} 
let prettyNr = (number) => {
	return  addComas(roundDecimal(number))
}



// read the customer json data
fs.readFile (__dirname + '/customer.json', 'utf-8', (err, data) => {
	// same than
	//fs.readFile (__dirname + '/customer.json', 'utf-8', function (err, data) )

	//parse the file to a readable object
	let parsedData = JSON.parse (data)
	calCompound (parsedData)
})
//function to calculate compound interest from a customer object
let calCompound = (customer ) => {
	// SEt end amount variable prop and calculate total duration
	customer.pension.endamount = {
		pessimistic: 	customer.finances.startcapital,
		average: 		customer.finances.startcapital,
		optimistic: 	customer.finances.startcapital
	}

	customer.pension.duration = ( customer.pension.age - customer.age )

	// Do the interst math

	for (var i = customer.pension.duration - 1; i>=0; i--) {

		//add monthy spend to all scenarios
		customer.pension.endamount.pessimistic 	+= (customer.finances.monthlyadd * 12 )
		customer.pension.endamount.average 		+= (customer.finances.monthlyadd * 12 )
		customer.pension.endamount.optimistic 	+= (customer.finances.monthlyadd * 12 )
		//calculate the added interest
		customer.pension.endamount.pessimistic 	*= customer.pension.interest.pessimistic
		customer.pension.endamount.average 		*= customer.pension.interest.average
		customer.pension.endamount.optimistic 	*= customer.pension.interest.optimistic

	}
	
		//output our Data
		//welcome the custo
		console.log ( "Welcome " + customer.name + " to our advanced pension planner" )
		console.log ( "You are starting with " + customer.finances.startcapital + " and add a monthly amound of " + customer.finances.monthlyadd )
		console.log ( "When you retire at age " + customer.pension.age + " Youll have the following")
		//ouptut the calcul stuff
		console.log ( "In a pessimistic scenario : €" 	+ prettyNr( customer.pension.endamount.pessimistic) )
		console.log ( "In a average scenario : €" 		+ prettyNr( customer.pension.endamount.average) )
		console.log ( "In a optimistic scenario : €" 	+ prettyNr( customer.pension.endamount.optimistic) )

	}











