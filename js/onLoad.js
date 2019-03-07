var loreming = false;
var words = 0;

var lorem_words = ["a", "ac", "accumsan", "ad", "adipiscing", "aenean", "aenean", "aliquam", "aliquam", "aliquet", "amet", "ante", "aptent", "arcu", "at", "auctor", "augue", "bibendum", "blandit", "class", "commodo", "condimentum", "congue", "consectetur", "consequat", "conubia", "convallis", "cras", "cubilia", "curabitur", "curabitur", "curae", "cursus", "dapibus", "diam", "dictum", "dictumst", "dolor", "donec", "donec", "dui", "duis", "egestas", "eget", "eleifend", "elementum", "elit", "enim", "erat", "eros", "est", "et", "etiam", "etiam", "eu", "euismod", "facilisis", "fames", "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce", "gravida", "habitant", "habitasse", "hac", "hendrerit", "himenaeos", "iaculis", "id", "imperdiet", "in", "inceptos", "integer", "interdum", "ipsum", "justo", "lacinia", "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "litora", "lobortis", "lorem", "luctus", "maecenas", "magna", "malesuada", "massa", "mattis", "mauris", "metus", "mi", "molestie", "mollis", "morbi", "nam", "nec", "neque", "netus", "nibh", "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci", "ornare", "pellentesque", "per", "pharetra", "phasellus", "placerat", "platea", "porta", "porttitor", "posuere", "potenti", "praesent", "pretium", "primis", "proin", "pulvinar", "purus", "quam", "quis", "quisque", "quisque", "rhoncus", "risus", "rutrum", "sagittis", "sapien", "scelerisque", "sed", "sem", "semper", "senectus", "sit", "sociosqu", "sodales", "sollicitudin", "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt", "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices", "ultricies", "urna", "ut", "ut", "varius", "vehicula", "vel", "velit", "venenatis", "vestibulum", "vitae", "vivamus", "viverra", "volutpat", "vulputate"];

if (window.addEventListener) {

  var kkeys = [],
    konami = "76,79,82,69,77,186";
  window.addEventListener("keydown", function(e) {
    if (loreming) {

      if (e.keyCode == 8) {
        words = words.slice(0, words.length - 1);
      } else if (e.keyCode == 32) {
        loreming = false;
        words = parseInt(words);
        addLorem(words);
        words = 0;
      } else {
        words += String.fromCharCode(e.keyCode);
      }
    } else {
      if (e.keyCode == 8)
        kkeys.pop();
      else {
        if (kkeys.length >= 6)
          kkeys.shift();

        kkeys.push(e.keyCode);
        if (kkeys.toString().indexOf(konami) >= 0) {
          loreming = true;
        }
      }
    }

  }, true);
}

function addLorem(words) {
  var p = "Lorem ipsum";

  for (var i = 0; i <= words - 3; i++) {
    var r = Math.floor(Math.random() * lorem_words.length);
    p += " " + lorem_words[r];
  }
  p += ".";

  if (document.activeElement.value)
    insertAtCursor(document.activeElement, p);
  else
    insertTextAtCursor(p);
}

function insertTextAtCursor(text) {
  var sel, range, html;
  sel = window.getSelection();
  range = sel.getRangeAt(0);
  range.deleteContents();
  var value = "";
  // value = range.commonAncestorContainer.textContent;
  // value = value.slice(0, value.length - 6 - words.toString().length);
  range.commonAncestorContainer.textContent = value;
  var textNode = document.createTextNode(text);
  range.insertNode(textNode);
  range.setStartAfter(textNode);
  sel.removeAllRanges();
  sel.addRange(range);
}

function insertAtCursor(myField, myValue) {
  myField.value = myField.value.slice(0, myField.length - 6 - words.toString().length);
  myField.value += myValue;
}
