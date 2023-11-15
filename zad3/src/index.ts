import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const searchFilesByName = (directory: string, fileName: string): void => {
  const files: string[] = fs.readdirSync(directory);
  let found: boolean = false;

  for (const file of files) {
    const filePath: string = path.join(directory, file);
    const stats: fs.Stats = fs.statSync(filePath);

    if (stats.isFile() && file.includes(fileName)) {
      console.log(filePath);
      found = true;
    }
  }

  if (!found) {
    console.log('Файл не найден.');
  }
};

const searchFilesByContent = (directory: string, content: string): void => {
  const files: string[] = fs.readdirSync(directory);
  let found: boolean = false;

  for (const file of files) {
    const filePath: string = path.join(directory, file);
    const stats: fs.Stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const fileContent: string = fs.readFileSync(filePath, 'utf-8');
      if (fileContent.includes(content)) {
        console.log(filePath);
        found = true;
      }
    }
  }

  if (!found) {
    console.log('Файл не найден.');
  }
};

const promptUser = (): void => {
  rl.question('Выберите действие:\n1. Поиск файлов по названию\n2. Поиск файлов по содержимому\n', (answer: string) => {
    switch (answer) {
      case '1':
        rl.question('Введите название файла: ', (fileName: string) => {
          rl.question('Введите путь к директории: ', (directory: string) => {
            console.log(`Результаты поиска файлов с названием "${fileName}":`);
            searchFilesByName(directory, fileName);
            console.log('\n');
            promptUser();
          });
        });
        break;
      case '2':
        rl.question('Введите текст для поиска: ', (content: string) => {
          rl.question('Введите путь к директории: ', (directory: string) => {
            console.log(`Результаты поиска файлов с содержимым "${content}":`);
            searchFilesByContent(directory, content);
            console.log('\n');
            promptUser();
          });
        });
        break;
      
      default:
        console.log('Неверный выбор. Повторите попытку.\n');
        promptUser();
        break;
    }
  });
};

promptUser();