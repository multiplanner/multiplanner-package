import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default (locatie) => `${dirname(fileURLToPath(import.meta.url))}/../opslag/${locatie}.json`;