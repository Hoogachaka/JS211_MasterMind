'use strict';

let colors = require('colors');
const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  let solutionArray = solution.split('') // 'abcd' => ['a','b','c','d']
  let guessArray = guess.split('')
  let correctLetterLocations = 0
  let correctLetters = 0
  let hint
  for (let i = 0;i < solutionArray.length; i++) {
    if(solutionArray[i] === guessArray[i]){
      correctLetterLocations ++
      solutionArray[i] = null
  }
}
    for (let i = 0;i<solutionArray.length;i++){
      if(guessArray.indexOf(solutionArray[i]) != -1){
      correctLetters++
      solutionArray[i]
    }
}
  hint = `| ${guess} | There are ${colors.green(correctLetterLocations)} letters in the correct postion and ${colors.red(correctLetters)} correct letters in the incorect location`
  // console.log(`There are ${colors.green(correctLetterLocations)} letters in the correct postion`)
  // console.log(`There are ${colors.red(correctLetters)} correct letters in the incorect location`)
  // console.log(hint)
  board.push(hint)
  if(board.length > 9){
    console.log(`${colors.red("You Suck")}`)
    console.log(`${colors.rainbow(solution)}`)
    board = []
  }
}

// const generateHintTwo = (guess) => {
//   let solutionArray = solution.split('') // 'abcd' => ['a','b','c','d']
//   let guessArray = guess.split('')
//   let correctLetterLocations = 0
//   let correctLetters = 0
//   guessArray.forEach(letter => {
//     for (let i = 0; i < solutionArray.length; i++) {
//       if(letter === solutionArray[i]){
//         correctLetterLocations++
//         console.log(`There are ${correctLetterLocations} correct letter locations`)
//       } 
//     }
//   })
// }

const mastermind = (guess) => {
  if(guess === solution) {
    console.log(colors.rainbow("You guessed it!"))
  } else {
    generateHint(guess)
  }
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
