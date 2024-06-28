// chat.js
import { client } from "./client";

const subscribeToChat = (chatRoomId, handleMessage) => {
  // Subscribe to chat messages in the specified chat room
  const subscription = client.subscribe(
    `databases.667de0690027c5d20f14.collections.667de0870019eb07f179.documents`,
    (response) => {
      if (
        response.events.includes("databases.*.collections.*.documents.*.create")
      ) {
        handleMessage(response.payload);
      }
    }
  );

  return subscription;
};

export { subscribeToChat };
