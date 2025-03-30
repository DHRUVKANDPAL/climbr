import { Room, RoomServiceClient } from "livekit-server-sdk";

const livekitHost = "https://my.livekit.host";
const svc = new RoomServiceClient(livekitHost, "api-key", "secret-key");

// list rooms
svc.listRooms().then((rooms: Room[]) => {
  console.log("existing rooms", rooms);
});

// create a new room
const opts = {
  name: "myroom",
  // timeout in seconds
  emptyTimeout: 10 * 60,
  maxParticipants: 20,
};
svc.createRoom(opts).then((room: Room) => {
  console.log("room created", room);
});

// delete a room
svc.deleteRoom("myroom").then(() => {
  console.log("room deleted");
});
