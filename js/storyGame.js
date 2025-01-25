
/* JavaScript for Interactive Story Game */
const storyTextElement = document.getElementById('story-text');
const choicesElement = document.getElementById('choices');
const restartButton = document.getElementById('restart-story');

const story = {
    start: {
        text: "You're Peter Parker, a high school student balancing life and your secret identity as Spider-Man. Today, you hear about a robbery at the bank. What do you do?",
        choices: [
            { text: "Suit up and head to the bank.", next: "bank" },
            { text: "Stay at school and focus on your studies.", next: "school" }
        ]
    },
    bank: {
        text: "You arrive at the bank and see two robbers escaping with bags of cash. One is heading toward the getaway car, and the other is taking hostages. Who do you stop first?",
        choices: [
            { text: "Stop the getaway car.", next: "car" },
            { text: "Save the hostages.", next: "hostages" }
        ]
    },
    school: {
        text: "You decide to stay at school, but guilt eats away at you. Later, you find out the robbery went poorly for the hostages. You vow to never let fear stop you again. The end.",
        choices: []
    },
    car: {
        text: "You web up the getaway car, trapping the driver. The remaining robber panics and tries to flee, but you manage to capture him with your quick reflexes. The city is safe again! The end.",
        choices: []
    },
    hostages: {
        text: "You prioritize saving the hostages. You use your webs to disarm the robber and calm the hostages. Meanwhile, the getaway car escapes. You vow to track them down another day. The end.",
        choices: []
    }
};

function startStory() {
    showStory('start');
}

function showStory(node) {
    const currentNode = story[node];
    storyTextElement.textContent = currentNode.text;
    choicesElement.innerHTML = '';

    currentNode.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.addEventListener('click', () => showStory(choice.next));
        choicesElement.appendChild(button);
    });

    restartButton.style.display = currentNode.choices.length === 0 ? 'block' : 'none';
}

restartButton.addEventListener('click', startStory);

startStory();