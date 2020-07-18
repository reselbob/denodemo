import { Application } from 'https://deno.land/x/oak/mod.ts'
import router from './routes.ts'

let app;

const HOST = '0.0.0.0'
const PORT = Deno.env.get("CALCULATOR_PORT") || 7700;

app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on ${HOST}:${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);