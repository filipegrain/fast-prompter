document.addEventListener('DOMContentLoaded', () => {
      const input = document.querySelector('.centered-input input');
      const wordContainer = document.querySelector('.word-container');
      const selectedWordsInput = document.getElementById('selected-words');
      const copyButton = document.getElementById('copy-button');

      // Load saved words from local storage
      const savedWords = JSON.parse(localStorage.getItem('words')) || [];
      savedWords.forEach(word => {
            const wordElement = createWordElement(word);
            wordContainer.appendChild(wordElement);
      });

      input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                  const word = input.value.trim();
                  if (word) {
                        const wordElement = createWordElement(word);
                        wordContainer.appendChild(wordElement);
                        saveWord(word);
                        input.value = '';
                  }
            }
      });

      copyButton.addEventListener('click', () => {
            selectedWordsInput.removeAttribute('disabled');
            selectedWordsInput.select();
            document.execCommand('copy');
            selectedWordsInput.setAttribute('disabled', 'true');
      });

      function createWordElement(word) {
            const wordElement = document.createElement('span');
            wordElement.textContent = word;
            wordElement.style.border = `2px solid ${getRandomColor()}`;
            wordElement.style.padding = '10px';
            wordElement.style.margin = '10px';
            wordElement.style.color = 'white';
            wordElement.style.borderRadius = '10px';
            wordElement.style.fontSize = '1.5em';
            wordElement.style.position = 'relative';
            wordElement.style.cursor = 'pointer';

            wordElement.addEventListener('click', () => {
                  selectedWordsInput.value += word + ' ';
            });

            const deleteIcon = document.createElement('span');
            deleteIcon.textContent = 'x';
            deleteIcon.style.position = 'absolute';
            deleteIcon.style.top = '0';
            deleteIcon.style.right = '0';
            deleteIcon.style.cursor = 'pointer';
            deleteIcon.style.color = 'red';
            deleteIcon.addEventListener('click', () => {
                  deleteWord(word);
                  wordElement.remove();
            });

            wordElement.appendChild(deleteIcon);
            return wordElement;
      }

      function saveWord(word) {
            const words = JSON.parse(localStorage.getItem('words')) || [];
            words.push(word);
            localStorage.setItem('words', JSON.stringify(words));
      }

      function deleteWord(word) {
            let words = JSON.parse(localStorage.getItem('words')) || [];
            words = words.filter(w => w !== word);
            localStorage.setItem('words', JSON.stringify(words));
      }

      function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                  color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
      }
});
