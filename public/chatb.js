document.addEventListener('DOMContentLoaded', function () {
    const chatContent = document.getElementById('chat-content');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    // Bot responses
    const initialOptions = [
        '1. Return an order',
        '2. Cancel an order',
        '3. Give us a review',
    ];

    function addBotMessage(message) {
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        botMessage.innerText = message;
        chatContent.appendChild(botMessage);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    // Display initial options
    initialOptions.forEach(option => {
        addBotMessage(option);
    });

    sendButton.addEventListener('click', function () {
        const userMessage = userInput.value;
        if (userMessage) {
            // Display user message
            const userMessageElement = document.createElement('div');
            userMessageElement.innerText = userMessage;
            chatContent.appendChild(userMessageElement);

            // Handle user input
            handleUserInput(userMessage);

            userInput.value = '';
        }
    });

    userInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    function handleUserInput(userMessage) {
        // Handle user input here and provide appropriate responses
        switch (userMessage) {
            case '1':
                // Respond to "Return an order" choice
                addBotMessage("You can initiate a return by visiting the 'Return Orders' section in your account.");
                break;
            case '2':
                // Respond to "Cancel an order" choice
                addBotMessage("To cancel an order, please go to 'Order History' and select the order you want to cancel.");
                break;
            case '3':
                // Respond to "Give us a review" choice
                addBotMessage("Thank you for your feedback! You can leave a review on the product page.");
                break;
            default:
                // Handle other user messages
                addBotMessage("I'm sorry, I didn't understand your request.");
                break;
        }

        // Display a "Thank you" message
        addBotMessage("Thank you for using our chat service!");
    }
});
