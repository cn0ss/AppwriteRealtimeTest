// client.js
import { Client } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://api.niklasschmidt.dev/v1")
  .setProject("667ddba4001de6d0a07b");

client.setEndpointRealtime("wss://api.niklasschmidt.dev/v1/realtime");

export { client };
