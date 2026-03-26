export function connectWebSocket() {
  const socket = new WebSocket("ws://localhost:3001");

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Live update:", data);
  };

  return socket;
}