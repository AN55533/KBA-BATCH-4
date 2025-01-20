const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let expensive = [];

function Menu() {
    console.log("expensive list");
    console.log("1. Add expensive details");
    console.log("2. View expensive details");
    console.log("3. Exit");
    rl.question("Choose an Option: ", handleOption);
}

function handleOption(option) {
    switch (option) {
        case '1':
            rl.question("Enter an expensive type: ", function (expensivetype) {
                rl.question("Enter   amount: ", function (amount) {
                    rl.question("date: ", function (date) {
                        
                   
                    
                        if (expensive !== 0) {
                            expensive.push(option.trim());
                            
                            console.log('expensive details added successfully');
                        } else {
                            console.log('Please enter  valid expensive details.');
                        }
                    
                       
                        Menu();
                       
                    });
                    

                });
            });
            break;
        case '2':
            console.log('view details');
            if (expensive.length > 0) {
                console.log('expensive details:', expensive);
            } else {
                console.log('No expensive details in the playlist.');
            }
             

    }
  
}
Menu();


