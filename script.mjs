const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');


navToggle.addEventListener('click', () => {
    console.log(links.classList);
    console.log(links.classList.contains('links'));
    if (links.classList.contains('show-links')) {
        links.classList.remove('show-links');
    } else {
        links.classList.add('show-links');
    }

});

import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyBC6O7pGbjPwZ-bx8Ko6Uy9pcHi_HL67d4"; // Replace with your actual OpenAI API key

export async function sendMessage() {
    var message = document.getElementById('message-input');
    console.log("Olá")
    if (!message.value) {
        message.style.border = '1px solid red';
        return;
    }
    message.style.border = 'none';

    var status = document.getElementById('status');
    var btnSubmit = document.getElementById('btn-submit');

    status.style.display = 'block';
    status.innerHTML = 'Carregando...';
    btnSubmit.disabled = true;
    btnSubmit.style.cursor = 'not-allowed';
    message.disabled = true;

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    } catch (e) {
        console.error("Error:", e);
        status.innerHTML = 'Erro, tente novamente mais tarde...';
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.style.cursor = 'pointer';
        message.disabled = false;
        message.value = '';
    }
}
function showHistory(message, response) {
    var historyBox = document.getElementById('history')

    // My message
    var boxMyMessage = document.createElement('div')
    boxMyMessage.className = 'box-my-message'

    var myMessage = document.createElement('p')
    myMessage.className = 'my-message'
    myMessage.innerHTML = message

    boxMyMessage.appendChild(myMessage)

    historyBox.appendChild(boxMyMessage)

    // Response message
    var boxResponseMessage = document.createElement('div')
    boxResponseMessage.className = 'box-response-message'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'response-message'
    chatResponse.innerHTML = response

    boxResponseMessage.appendChild(chatResponse)

    historyBox.appendChild(boxResponseMessage)

    // Levar scroll para o final
    historyBox.scrollTop = historyBox.scrollHeight
}

