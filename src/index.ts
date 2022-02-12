import { Mux, App, Handler, Handlers } from "mux";
import http from "http";

const _404: Handler = async function (_r, w, _ctx) {
  w.statusCode = 404;
  w.end();
};

const handler: Handler = async function (_r, w, _ctx) {
  w.statusCode = 200;
  w.end(JSON.stringify({ hello: "world" }));
};

const handlers: Handlers = {
  "/": handler,
};

const mux = Mux(handlers, _404);
const app = App(mux);

const server = http.createServer(app);

server.listen(8080);
