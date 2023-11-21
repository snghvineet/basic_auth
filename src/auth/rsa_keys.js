import { readFileSync } from 'fs';

const privateKey = readFileSync('./private.pem', 'utf-8');
const publicKey = readFileSync('./public.pem', 'utf-8');

const rsaKeys = { privateKey, publicKey };
export default rsaKeys;
