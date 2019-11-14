let loreming = false;
let readyToInsert = false;
let wordCount = 0;

let lorem_words = ["a", "ac", "accumsan", "ad", "adipiscing", "aenean", "aenean", "aliquam", "aliquam", "aliquet", "amet", "ante", "aptent", "arcu", "at", "auctor", "augue", "bibendum", "blandit", "class", "commodo", "condimentum", "congue", "consectetur", "consequat", "conubia", "convallis", "cras", "cubilia", "curabitur", "curabitur", "curae", "cursus", "dapibus", "diam", "dictum", "dictumst", "dolor", "donec", "donec", "dui", "duis", "egestas", "eget", "eleifend", "elementum", "elit", "enim", "erat", "eros", "est", "et", "etiam", "etiam", "eu", "euismod", "facilisis", "fames", "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce", "gravida", "habitant", "habitasse", "hac", "hendrerit", "himenaeos", "iaculis", "id", "imperdiet", "in", "inceptos", "integer", "interdum", "ipsum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "litora", "lobortis", "lorem", "luctus", "maecenas", "magna", "malesuada", "massa", "mattis", "mauris", "metus", "mi", "molestie", "mollis", "morbi", "nam", "nec", "neque", "netus", "nibh", "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci", "ornare", "pellentesque", "per", "pharetra", "phasellus", "placerat", "platea", "porta", "porttitor", "posuere", "potenti", "praesent", "pretium", "primis", "proin", "pulvinar", "purus", "quam", "quis", "quisque", "quisque", "rhoncus", "risus", "rutrum", "sagittis", "sapien", "scelerisque", "sed", "sem", "semper", "senectus", "sit", "sociosqu", "sodales", "sollicitudin", "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt", "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices", "ultricies", "urna", "ut", "ut", "varius", "vehicula", "vel", "velit", "venenatis", "vestibulum", "vitae", "vivamus", "viverra", "volutpat", "vulputate"];

let keysPressed = [],
    code = "76,79,82,69,77";

window.addEventListener('mousedown', function (e) {
    if (loreming || readyToInsert) {
        cancel();
    }
});

window.addEventListener("keydown", function (e) {
    if (readyToInsert) {
        if (e.keyCode === 9 || e.keyCode === 32) {
            e.preventDefault();
            addLorem(wordCount);
        }
        cancel();
    }
    else if (loreming) {
        if (e.keyCode === 186) {
            loreming = false;
            wordCount = parseInt(wordCount);
            readyToInsert = true;
        } else {
            wordCount += String.fromCharCode(e.keyCode);
        }
    } else {
        if (keysPressed.length >= 6)
            keysPressed.shift();

        keysPressed.push(e.keyCode);
        if (keysPressed.toString().indexOf(code) >= 0) {
            loreming = true;
        }
    }

}, true);

function cancel() {
    wordCount = 0;
    keysPressed = [];
    loreming = false;
    readyToInsert = false;
}

function addLorem(words) {
    let p = "Lorem ipsum";

    for (let i = 0; i <= words - 3; i++) {
        let r = Math.floor(Math.random() * lorem_words.length);
        p += " " + lorem_words[r];
    }
    p += ".";

    insertText(p);
}
function insertText(text) {
  let spaces = 6+wordCount.toString().length;
  if (document.activeElement.value) {
    let e = document.activeElement;
      e.value = e.value.slice(0, e.length - spaces);
      e.value += text;
  }else{
    let sel, range, cursorPos;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            cursorPos = range.startOffset - spaces;
            range.deleteContents();
            range.insertNode( document.createTextNode(text));
            let r = setSelectionRange(range.startContainer, cursorPos, cursorPos+spaces);
            r.deleteContents();
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
  }
}

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

function setSelectionRange(el, start, end) {
    if (document.createRange && window.getSelection) {
        let range = document.createRange();
        range.selectNodeContents(el);
        let textNodes = getTextNodesIn(el);
        let foundStart = false;
        let charCount = 0, endCharCount;

        for (let i = 0, textNode; textNode = textNodes[i++]; ) {
            endCharCount = charCount + textNode.length;
            if (!foundStart && start >= charCount && (start < endCharCount || (start == endCharCount && i <= textNodes.length))) {
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
