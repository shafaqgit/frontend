import io from "socket.io-client";
// import { SOCKET_URL } from "config";


class socket {
  constructor(url) {
    this.sock = io(url);
  }

  on(event, callback) {
    this.sock.on(event, callback);
  }

  emit(event, data) {
    this.sock.emit(event, data);
  }

  disconnect() {
    this.sock.disconnect();
  }
}

export default new socket('http://192.168.10.5:8080');
