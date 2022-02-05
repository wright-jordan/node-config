import { Mux, App, Handler, Handlers } from "mux";
import http from "http";
import crypto from "crypto";

declare module "mux" {
  interface Ctx {
    session?: {
      id?: string;
    };
  }
}

const _404: Handler = async function (r, w, ctx) {
  w.statusCode = 404;
  w.end();
};

const handler: Handler = async function (r, w, ctx) {
  ctx.session = { id: crypto.randomBytes(16).toString("hex") };
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
