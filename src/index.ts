import { makeListener, makeRouter, Handler, Handlers } from "ts-http";
import http from "http";

const handler: Handler = async function (ctx) {
  ctx.reply = JSON.stringify({ hello: "world" });
};

const handlers: Handlers = {
  "/": handler,
  async ["404"](ctx) {
    ctx.status = 404;
  },
};

const router = makeRouter(handlers);
const listener = makeListener(router);

http.createServer(listener).listen(8080);
