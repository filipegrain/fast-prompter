document.addEventListener('DOMContentLoaded', () => {
      const addNewWordInput = document.querySelector('.centered-input #add-new-word');
      const pastedTextInput = document.getElementById('pasted-text');
      const addPastedTextButton = document.getElementById('add-pasted-text-button');
      const wordsContainer = document.querySelector('.word-container');
      const selectedWordsInput = document.getElementById('selected-words');
      const copyButton = document.getElementById('copy-button');
      const clearButton = document.getElementById('clear-button');

      // Load saved words from local storage
      const savedWords = JSON.parse(localStorage.getItem('words')) || [];
      savedWords.forEach(word => {
            const wordElement = createWordElement(word);
            wordsContainer.appendChild(wordElement);
      });

      // Show or hide the clear button based on the words list length
      toggleClearButton();

      // Show or hide the add button based on the pasted-text input value
      toggleAddButton();

      // Show or hide the copy button based on the selected-words input value
      toggleCopyButton();

      addNewWordInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                  const word = addNewWordInput.value.trim();
                  if (word) {
                        const wordElement = createWordElement(word);
                        wordsContainer.appendChild(wordElement);
                        saveWord(word);
                        addNewWordInput.value = '';
                        toggleClearButton();
                  }
            }
      });

      pastedTextInput.addEventListener('focus', () => {
            pastedTextInput.select();
      });

      pastedTextInput.addEventListener('input', () => {
            toggleAddButton();
      });

      addPastedTextButton.addEventListener('click', () => {
            const word = pastedTextInput.value.trim();
            if (word) {
                  selectedWordsInput.value += word + ' ';
                  toggleCopyButton();
            }
      });

      copyButton.addEventListener('click', () => {
            selectedWordsInput.removeAttribute('disabled');
            selectedWordsInput.select();
            document.execCommand('copy');
            selectedWordsInput.setAttribute('disabled', 'true');
      });

      clearButton.addEventListener('click', () => {
            wordsContainer.innerHTML = '';
            localStorage.removeItem('words');
            toggleClearButton();
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
                  toggleCopyButton();
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
                  toggleClearButton();
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

      function toggleClearButton() {
            if (wordsContainer.children.length > 0) {
                  clearButton.style.display = 'block';
            } else {
                  clearButton.style.display = 'none';
            }
      }

      function toggleAddButton() {
            if (pastedTextInput.value.trim() !== '') {
                  addPastedTextButton.style.display = 'inline-block';
            } else {
                  addPastedTextButton.style.display = 'none';
            }
      }

      function toggleCopyButton() {
            if (selectedWordsInput.value.trim() !== '') {
                  copyButton.style.display = 'inline-block';
            } else {
                  copyButton.style.display = 'none';
            }
      }
});
