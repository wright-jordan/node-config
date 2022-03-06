import {
  makeListener,
  makeRouter,
  Handler,
  Handlers,
  listenHTTP,
} from "ts-http";

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

listenHTTP(listener, 8080n);
