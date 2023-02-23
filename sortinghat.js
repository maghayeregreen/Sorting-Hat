const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that maps each Hogwarts House to its advice
const advice = {
  Gryffindor: 'Be brave and courageous, but remember to also be humble and kind.',
  Hufflepuff: 'Be loyal, patient, and hardworking. Don\'t be afraid to stand up for what is right.',
  Ravenclaw: 'Be curious and seek knowledge, but also remember to value friendship and empathy.',
  Slytherin: 'Be ambitious and cunning, but also remember to be true to yourself and loyal to your friends.'
};

readline.question('Welcome to Hogwarts! What is your name? ', name => {
  // Assigns a House randomly
  const assignedHouse = assignHouse();

  // Tell the user which Hogwarts House they have been assigned to
  console.log(`Congratulations, ${name}! You have been assigned to ${assignedHouse}.`);

  // Asks the user if they have a preferred House
  readline.question(`Hmmmm..do you have a preferred Hogwarts House, ${name}? (yes/no) `, hasPreference => {
    let chosenHouse;

    // If the user has a preference, ask them to choose a House and assign it to them
    if (hasPreference.toLowerCase() === 'yes') {
      readline.question('I see..which House do you prefer? (Gryffindor, Hufflepuff, Ravenclaw, or Slytherin) ', housePreference => {
        // Checks that the user has entered a valid House name
        if (!advice[housePreference]) {
          // If the user has entered an invalid House name, assign the House they were randomly assigned to
          console.log('No! that is not a valid House name! You will be assigned the House I originally assigned you to.');
          chosenHouse = assignedHouse;
        } else {
          chosenHouse = housePreference;
        }

        displayAdvice(chosenHouse);
      });
    } else {
      // If the user doesn't have a preference, assign them the House they were randomly assigned to
      chosenHouse = assignedHouse;
      displayAdvice(chosenHouse);
    }
  });
});

// Create a function that randomly assigns a Hogwarts House
function assignHouse() {
  const houses = Object.keys(advice);
  const index = Math.floor(Math.random() * houses.length);
  return houses[index];
}

// Create a function that displays advice based on the House
function displayAdvice(chosenHouse) {
  // Ask if the user wants advice
  readline.question(`You have been assigned to ${chosenHouse}. Would you like some advice? (yes/no) `, response => {
    // If the user wants advice, display it based on their House
    if (response.trim().toLowerCase() === 'yes') {
      console.log(advice[chosenHouse]);
    } else {
      console.log('Very well, enjoy your year at Hogwarts!');
      readline.close();
    }
  });
}
