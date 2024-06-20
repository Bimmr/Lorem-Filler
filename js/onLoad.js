let lorem_matched = false,
    ready_to_insert = false
let word_count = ""

let keys_history = []

// On Mousedown reset lorem filler
window.addEventListener("mousedown", function (e) {
  if (lorem_matched || ready_to_insert) {
    reset()
  }
})

// On Keyup
window.addEventListener("keyup", e=> {
    
    //If matched lorem, has numbers, and pressed semi-colin
    if (ready_to_insert) {
      if (e.key == "Enter" || e.key == " " || e.key == "Tab") {
        e.preventDefault()
        generateLoremFiller(parseInt(word_count))
      }
      //Reset regardless of what gets pressed
      reset();
    } 
    
    //If matched lorem we're either watching for numbers, or a semi-colin
    else if (lorem_matched) {

        //If semi-colin, get read for insert
        if (e.key == ";") {
            word_count = parseInt(word_count)
            ready_to_insert = true
        }
        //If is a number track the key pressed as string (Convert to int in next step)
        else if(!isNaN(Number(e.key)))
            word_count += e.key

        //If backspace, then remove the last number tracked
        else if(e.key=="Backspace" && word_count>1){
            word_count = word_count.substring(0, word_count.length-1)
        }

        //If backspace and no previous numbers, you're no longer matching lorem
        else if(e.key=="Backspace" && word_count.length==0){
            lorem_matched = false
        }
       
        //Anything else, reset
        else
            reset();
        
    } 
    
    
    else {
        //Only keep track of last 6 keys pressed
        if (keys_history.length >= 6) keys_history.shift()
        keys_history.push(e.key)

        //Check if last 6 keys match "lorem"
        if (keys_history.toString().indexOf(["l", "o", "r", "e", "m"].toString()) >= 0) {
            lorem_matched = true;
      }
    }
  },
  true
)

function reset() {
  word_count = ""
  keys_history = []
  lorem_matched = false
  ready_to_insert = false
}


function generateLoremFiller(words) {
  let p = "Lorem ipsum"

  for (let i = 0; i <= words - 3; i++) {
    let r = Math.floor(Math.random() * lorem_words.length)
    p += " " + lorem_words[r]
  }
  p += "."

  insertText(p)
}

//Insert text
function insertText(text) {
  let spaces = 6 + word_count.length;

  //Simple Insert
  if (document.activeElement.value) {
    let e = document.activeElement;
    e.value = e.value.slice(0, e.length - spaces);
    e.value += text;
  }
  //Compliacated insert - not sure how it works...
  else {
    let sel, range, cursorPos;
    if (window.getSelection) {
      sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        cursorPos = range.startOffset - spaces;
        range.deleteContents();
        range.insertNode(document.createTextNode(text));
        let r = setSelectionRange(
          range.startContainer,
          cursorPos,
          cursorPos + spaces
        );
        r.deleteContents();
      }
    } else if (document.selection && document.selection.createRange) {
      document.selection.createRange().text = text;
    }
  }
}
// Support function for compllicated insert
function getTextNodesIn(node) {
  let textNodes = [];
  if (node.nodeType == 3) {
    textNodes.push(node);
  } else {
    let children = node.childNodes;
    for (let i = 0, len = children.length; i < len; ++i) {
      textNodes.push.apply(textNodes, getTextNodesIn(children[i]));
    }
  }
  return textNodes;
}
// Support function for compllicated insert
function setSelectionRange(el, start, end) {
  if (document.createRange && window.getSelection) {
    let range = document.createRange();
    range.selectNodeContents(el);
    let textNodes = getTextNodesIn(el);
    let foundStart = false;
    let charCount = 0,
      endCharCount;

    for (let i = 0, textNode; (textNode = textNodes[i++]); ) {
      endCharCount = charCount + textNode.length;
      if (
        !foundStart &&
        start >= charCount &&
        (start < endCharCount ||
          (start == endCharCount && i <= textNodes.length))
      ) {
        range.setStart(textNode, start - charCount);
        foundStart = true;
      }
      if (foundStart && end <= endCharCount) {
        range.setEnd(textNode, end - charCount);
        break;
      }
      charCount = endCharCount;
    }

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    return range;
  } else if (document.selection && document.body.createTextRange) {
    let textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(true);
    textRange.moveEnd("character", end);
    textRange.moveStart("character", start);
    textRange.select();
    return textRange;
  }
}

//Possible Lorem Filler words
let lorem_words = [
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