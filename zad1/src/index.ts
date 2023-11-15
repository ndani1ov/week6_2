const getInputString = (): string => {
  const inputElement = document.getElementById('input') as HTMLInputElement;
  return inputElement.value;
};

const displayResult = (char: string, count: number) => {
  const resultElement = document.getElementById('result') as HTMLBodyElement;
  resultElement.innerHTML = `Наиболее частый символ: ${char}, Количество: ${count}`;
};

const findMostFrequent = () => {
  const inputString = getInputString();
  const charCounts = new Map<string, number>();
  for (const char of inputString) {
    if (charCounts.has(char)) {
      charCounts.set(char, charCounts.get(char)! + 1);
    } else {
      charCounts.set(char, 1);
    }
  }
  let maxChar = '';
  let maxCount = 0;
  for (const [char, count] of charCounts) {
    if (count > maxCount) {
      maxChar = char;
      maxCount = count;
    }
  }

  displayResult(maxChar, maxCount);
};