import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

let handler;

export default async function (req, res) {
  if (!handler) {
    const { reqHandler } = await import(
      join(__dirname, '../dist/trucospadesarrollo/server/server.mjs')
    );
    handler = reqHandler;
  }
  return handler(req, res);
}
