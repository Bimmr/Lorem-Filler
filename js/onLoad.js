var loreming = false;
var readyToInsert = false;
var wordCount = 0;

var lorem_words = ["a", "ac", "accumsan", "ad", "adipiscing", "aenean", "aenean", "aliquam", "aliquam", "aliquet", "amet", "ante", "aptent", "arcu", "at", "auctor", "augue", "bibendum", "blandit", "class", "commodo", "condimentum", "congue", "consectetur", "consequat", "conubia", "convallis", "cras", "cubilia", "curabitur", "curabitur", "curae", "cursus", "dapibus", "diam", "dictum", "dictumst", "dolor", "donec", "donec", "dui", "duis", "egestas", "eget", "eleifend", "elementum", "elit", "enim", "erat", "eros", "est", "et", "etiam", "etiam", "eu", "euismod", "facilisis", "fames", "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce", "gravida", "habitant", "habitasse", "hac", "hendrerit", "himenaeos", "iaculis", "id", "imperdiet", "in", "inceptos", "integer", "interdum", "ipsum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "litora", "lobortis", "lorem", "luctus", "maecenas", "magna", "malesuada", "massa", "mattis", "mauris", "metus", "mi", "molestie", "mollis", "morbi", "nam", "nec", "neque", "netus", "nibh", "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci", "ornare", "pellentesque", "per", "pharetra", "phasellus", "placerat", "platea", "porta", "porttitor", "posuere", "potenti", "praesent", "pretium", "primis", "proin", "pulvinar", "purus", "quam", "quis", "quisque", "quisque", "rhoncus", "risus", "rutrum", "sagittis", "sapien", "scelerisque", "sed", "sem", "semper", "senectus", "sit", "sociosqu", "sodales", "sollicitudin", "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt", "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices", "ultricies", "urna", "ut", "ut", "varius", "vehicula", "vel", "velit", "venenatis", "vestibulum", "vitae", "vivamus", "viverra", "volutpat", "vulputate"];

var keysPressed = [],
    code = "76,79,82,69,77";

window.addEventListener('mousedown', function (e) {
    if (loreming || readyToInsert) {
        cancel();
    }
});
window.addEventListener("keydown", function (e) {
    if (readyToInsert) {
        if (e.keyCode == 9) {
            e.preventDefault();
            addLorem(wordCount);
        }
        cancel();
    }
    else if (loreming) {
        if (e.keyCode == 186) {
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
    var p = "Lorem ipsum";

    for (var i = 0; i <= words - 3; i++) {
        var r = Math.floor(Math.random() * lorem_words.length);
        p += " " + lorem_words[r];
    }
    p += ".";

    insertText(document.activeElement, p);
}

function insertText(myField, text) {
    if (myField.value) {
        myField.value = myField.value.slice(0, myField.length - 6 - wordCount.toString().length);
        myField.value += text;
    } else {
        var sel, range;
        sel = window.getSelection();
        range = sel.getRangeAt(0);
        range.deleteContents();
        var value = "";
        // value = range.commonAncestorContainer.textContent;
        // value = value.slice(0, value.length - 6 - wordCount.toString().length);
        range.commonAncestorContainer.textContent = value;
        var textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.setStartAfter(textNode);
        sel.removeAllRanges();
        sel.addRange(range);
    }
}
