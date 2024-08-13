import inquirer from "inquirer";
const currency = {
    AUD: 1.5,
    CAD: 1.34,
    CHF: 0.88,
    CNY: 7.28,
    EUR: 0.92,
    GBP: 0.77,
    INR: 83.18,
    JPY: 142.5,
    PKR: 278.62,
    USD: 1 //Base Currency
};
const questions = [
    {
        name: "fromCurrency",
        message: "Select the currency you want to convert from:",
        type: "list",
        choices: Object.keys(currency),
    },
    {
        name: "toCurrency",
        message: "Select the currency you want to convert to:",
        type: "list",
        choices: Object.keys(currency),
    },
    {
        type: "input",
        name: "amount",
        message: "Enter the amount you wish to convert:",
        validate: (input) => input > 0 || "Please enter a positive number",
    },
    {
        type: "confirm",
        name: "roundOff",
        message: "Would you like to round off the final converted number?",
        default: true,
    }
];
async function runConverter() {
    try {
        const userAns = await inquirer.prompt(questions);
        const fromAmount = currency[userAns.fromCurrency];
        const toAmount = currency[userAns.toCurrency];
        const amount = userAns.amount;
        let baseAmount = amount / fromAmount;
        let convertedAmount = baseAmount * toAmount;
        if (userAns.roundOff) {
            convertedAmount = Math.round(convertedAmount * 100) / 100;
        }
        ;
        console.log(`\nConverted Amount: ${amount} ${userAns.fromCurrency} = ${convertedAmount} ${userAns.toCurrency}\n`);
    }
    catch (error) {
        console.log("An error occured during conversion:", error);
    }
}
runConverter();
