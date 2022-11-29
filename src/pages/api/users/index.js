import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'data/users');
  const files = fs.readdirSync(directoryPath);

  const users = files.map((file) => ({
    ...JSON.parse(fs.readFileSync(path.join(directoryPath, file), 'utf8')),
    username: file.split('.')[0],
  }));

  return res.status(200).json(users);
}
