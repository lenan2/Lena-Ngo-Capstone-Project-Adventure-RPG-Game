const storyElement = document.getElementById('story');
const stepElement = document.getElementById('step');
const choicesElement = document.getElementById('choices');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');
const optionsDiv = document.getElementById('options');
const resultElement = document.getElementById('result');

let step = 1;

const steps = {
  1: {
    story: "Step 1: The Mysterious Door\nYou stand in front of a mysterious door, guarding the hidden chamber. Two keys lie before you.",
    choices: [
      { text: "Choose the golden key", nextStep: 2 },
      { text: "Choose the silver key", nextStep: "end" }
    ]
  },
  2: {
    story: "Step 2: The Enchanted Garden\nUpon unlocking the door, you enter an enchanted garden. Two magical creatures appear, each guarding a different path.",
    choices: [
      { text: "Follow the wise owl to the left", nextStep: 3 },
      { text: "Follow the mischievous sprite to the right", nextStep: "end" }
    ]
  },
  3: {
    story: "Step 3: The Chamber of Secrets\nYou arrive at the Chamber of Secrets where the legendary key is rumored to be. A guardian awaits, posing one final question.",
    choices: [
      { text: "Answer the guardian's riddle", nextStep: "success" },
      { text: "Take a gamble without responding", nextStep: "end" }
    ]
  },
  success: {
    story: "Congratulations! You answered the guardian's riddle correctly. You found the lost key!",
    choices: []
  }
};

function startAdventure() {
  startButton.style.display = "none";
  optionsDiv.style.display = "block";
  showStep(step);
}

function showStep(stepNumber) {
  const currentStep = steps[stepNumber];
  stepElement.textContent = currentStep.story;
  choicesElement.innerHTML = '';
  currentStep.choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.onclick = () => {
      if (choice.nextStep === "end") {
        endGame();
      } else if (choice.nextStep === "success") {
        showSuccess();
      } else {
        step = choice.nextStep;
        showStep(step);
      }
    };
    choicesElement.appendChild(button);
  });
}

function endGame() {
  storyElement.textContent = "Game Over! You made an unwise choice and await your demise.";
  restartButton.style.display = "block";
  resultElement.style.display = "none";
  stepElement.textContent = ''; // Clear step information
  choicesElement.innerHTML = ''; // Clear choices
}

function showSuccess() {
  storyElement.innerHTML = "Congratulations! You found the lost key and unlocked the secrets within!<br><span id='result'>You are victorious!</span>";
  restartButton.style.display = "block";
  stepElement.textContent = ''; // Clear step information
  choicesElement.innerHTML = ''; // Clear choices
}

function restartGame() {
  step = 1;
  startButton.style.display = "block";
  optionsDiv.style.display = "none";
  restartButton.style.display = "none";
  resultElement.style.display = "none";

  // Clear all content
  storyElement.innerHTML = "You have been told to go on a quest to find the lost key by the Queen of your lands. You have traveled a long way to get to the spot on the map where the Queen thinks the lost key resides.";
  stepElement.textContent = '';
  choicesElement.innerHTML = '';
  resultElement.innerHTML = '';
}

