// Encapsulate everything to avoid global pollution
(() => {
  'use strict';

  // Constants
  const LOREM_TRIGGER = 'lorem';
  const LOREM_TRIGGER_LENGTH = LOREM_TRIGGER.length;
  const DEFAULT_WORD_COUNT = 50;
  const INITIAL_WORDS = ['Lorem', 'ipsum'];

  // State management
  let loremMatched = false;
  let wordCount = '';
  let keysHistory = [];

  // On Mousedown reset lorem filler
  window.addEventListener('mousedown', (e) => {
    if (loremMatched) {
      reset();
    }
  });

  // On Keyup
  window.addEventListener('keyup', (e) => {
    try {
      // If matched lorem we're either watching for numbers, or a semicolon
      if (loremMatched) {
        // If semicolon, insert immediately
        if (e.key === ';') {
          generateLoremFiller(parseInt(wordCount) || DEFAULT_WORD_COUNT);
          reset();
        }
        // If is a number track the key pressed as string (Convert to int in next step)
        else if (!isNaN(Number(e.key))) {
          wordCount += e.key;
        }
        // If backspace, then remove the last number tracked
        else if (e.key === 'Backspace' && wordCount.length > 0) {
          wordCount = wordCount.substring(0, wordCount.length - 1);
        }
        // If backspace and no previous numbers, you're no longer matching lorem
        else if (e.key === 'Backspace' && wordCount.length === 0) {
          loremMatched = false;
        }
        // Anything else, reset
        else {
          reset();
        }
      } 
      
      else {
        // Only keep track of last keys needed to match trigger word
        if (keysHistory.length >= LOREM_TRIGGER_LENGTH) {
          keysHistory.shift();
        }
        keysHistory.push(e.key.toLowerCase());

        // Check if last keys match "lorem"
        if (keysHistory.join('') === LOREM_TRIGGER) {
          loremMatched = true;
        }
      }
    } catch (error) {
      console.error('Lorem Filler error:', error);
      reset();
    }
  }, true);

  function reset() {
    wordCount = '';
    keysHistory = [];
    loremMatched = false;
  }

  function generateLoremFiller(words) {
    let paragraph = INITIAL_WORDS.join(' ');
    const wordsToGenerate = Math.max(0, words - INITIAL_WORDS.length);

    for (let i = 0; i < wordsToGenerate; i++) {
      const randomIndex = Math.floor(Math.random() * LOREM_WORDS.length);
      paragraph += ' ' + LOREM_WORDS[randomIndex];
    }
    paragraph += '.';

    insertText(paragraph);
  }

  // Insert text and remove trigger
  function insertText(text) {
    try {
      const element = document.activeElement;
      const charsToDelete = LOREM_TRIGGER_LENGTH + wordCount.length + 1;

      // Handle standard input/textarea elements
      if (element && element.value !== undefined) {
        const cursorPos = element.selectionStart;
        element.value = 
          element.value.substring(0, cursorPos - charsToDelete) + 
          text + 
          element.value.substring(cursorPos);
        
        // Position cursor after inserted text
        const newCursorPos = cursorPos - charsToDelete + text.length;
        element.setSelectionRange(newCursorPos, newCursorPos);
        return;
      }

      // Handle contenteditable elements
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      
      // Create a range to select the trigger text backwards from cursor
      const deleteRange = range.cloneRange();
      deleteRange.setStart(range.startContainer, Math.max(0, range.startOffset - charsToDelete));
      deleteRange.setEnd(range.startContainer, range.startOffset);
      
      // Delete trigger and insert lorem text
      deleteRange.deleteContents();
      const textNode = document.createTextNode(text);
      deleteRange.insertNode(textNode);
      
      // Move cursor to end of inserted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
      
    } catch (error) {
      console.error('Lorem Filler insertion error:', error);
    }
  }

  // Possible Lorem Filler words
  const LOREM_WORDS = [
    "a",
    "ac",
    "accumsan",
    "ad",
    "adipiscing",
    "aenean",
    "aenean",
    "aliquam",
    "aliquam",
    "aliquet",
    "amet",
    "ante",
    "aptent",
    "arcu",
    "at",
    "auctor",
    "augue",
    "bibendum",
    "blandit",
    "class",
    "commodo",
    "condimentum",
    "congue",
    "consectetur",
    "consequat",
    "conubia",
    "convallis",
    "cras",
    "cubilia",
    "curabitur",
    "curabitur",
    "curae",
    "cursus",
    "dapibus",
    "diam",
    "dictum",
    "dictumst",
    "dolor",
    "donec",
    "donec",
    "dui",
    "duis",
    "egestas",
    "eget",
    "eleifend",
    "elementum",
    "elit",
    "enim",
    "erat",
    "eros",
    "est",
    "et",
    "etiam",
    "etiam",
    "eu",
    "euismod",
    "facilisis",
    "fames",
    "faucibus",
    "felis",
    "fermentum",
    "feugiat",
    "fringilla",
    "fusce",
    "gravida",
    "habitant",
    "habitasse",
    "hac",
    "hendrerit",
    "himenaeos",
    "iaculis",
    "id",
    "imperdiet",
    "in",
    "inceptos",
    "integer",
    "interdum",
    "ipsum",
    "justo",
    "lacinia",
    "lacus",
    "laoreet",
    "lectus",
    "leo",
    "libero",
    "ligula",
    "litora",
    "lobortis",
    "lorem",
    "luctus",
    "maecenas",
    "magna",
    "malesuada",
    "massa",
    "mattis",
    "mauris",
    "metus",
    "mi",
    "molestie",
    "mollis",
    "morbi",
    "nam",
    "nec",
    "neque",
    "netus",
    "nibh",
    "nisi",
    "nisl",
    "non",
    "nostra",
    "nulla",
    "nullam",
    "nunc",
    "odio",
    "orci",
    "ornare",
    "pellentesque",
    "per",
    "pharetra",
    "phasellus",
    "placerat",
    "platea",
    "porta",
    "porttitor",
    "posuere",
    "potenti",
    "praesent",
    "pretium",
    "primis",
    "proin",
    "pulvinar",
    "purus",
    "quam",
    "quis",
    "quisque",
    "quisque",
    "rhoncus",
    "risus",
    "rutrum",
    "sagittis",
    "sapien",
    "scelerisque",
    "sed",
    "sem",
    "semper",
    "senectus",
    "sit",
    "sociosqu",
    "sodales",
    "sollicitudin",
    "suscipit",
    "suspendisse",
    "taciti",
    "tellus",
    "tempor",
    "tempus",
    "tincidunt",
    "torquent",
    "tortor",
    "tristique",
    "turpis",
    "ullamcorper",
    "ultrices",
    "ultricies",
    "urna",
    "ut",
    "ut",
    "varius",
    "vehicula",
    "vel",
    "velit",
    "venenatis",
    "vestibulum",
    "vitae",
    "vivamus",
    "viverra",
    "volutpat",
    "vulputate",
  ];
})();