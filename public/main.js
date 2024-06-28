// main.js
import { Databases } from "appwrite";
import { subscribeToChat } from "./chat";
import { client } from "./client";

const databases = new Databases(client);
const chatRoomId = "your_chat_room_id"; // Replace with your chat room ID
const collectionId = "your_collection_id"; // Replace with your collection ID

const messagesContainer = document.getElementById("messages");
const messageForm = document.getElementById("message-form");
const messageInput = document.getElementById("message-input");

if (!messagesContainer || !messageForm || !messageInput) {
  console.error("Required DOM elements are missing");
  // Optionally, you can throw an error to stop execution if elements are critical
  // throw new Error('Required DOM elements are missing');
} else {
  // Function to display a message
  const displayMessage = (message) => {
    const messageElement = document.createElement("div");
    messageElement.textContent = message.text;
    messagesContainer.appendChild(messageElement);
  };

  // Subscribe to chat messages
  const subscription = subscribeToChat(chatRoomId, (message) => {
    displayMessage(message);
  });

  // Send a new message
  messageForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const messageText = messageInput.value;

    if (messageText.trim() !== "") {
      try {
        await databases.createDocument(
          "667de0690027c5d20f14", // Replace with your database ID
          "667de0870019eb07f179", // Replace with your collection ID
          "unique()", // This generates a unique document ID
          {
            text: messageText,
            chatRoomId: chatRoomId,
          }
        );

        messageInput.value = "";
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  });
}
