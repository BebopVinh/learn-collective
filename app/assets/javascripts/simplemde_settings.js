$(document).on('ready page:load', function () {
   //targets contribution form's text-area and convert to Simple Markdown Editor
   let simplemde = new SimpleMDE({
      element: $("textarea.content-text-area")[0],
      autofocus: true,
      forceSync: true,
      indentWithTabs: true,
      insertTexts: {
         horizontalRule: ["", "\n\n-----\n\n"],
         image: ["![](http://", ")"],
         link: ["[", "](http://)"],
         table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
      },
      lineWrapping: true,
      parsingConfig: {
         allowAtxHeaderWithoutSpace: true,
         strikethrough: true,
         underscoresBreakWords: true,
      },
      placeholder: "Type here...",
      promptURLs: true,
      renderingConfig: {
         singleLineBreaks: false,
         codeSyntaxHighlighting: true,
      },
      shortcuts: {
         drawTable: "Cmd-Alt-T"
      },
      showIcons: ["code", "table"],
      spellChecker: false,
      status: false,
      status: ["autosave", "lines", "words", "cursor"], // Optional usage
      status: ["autosave", "lines", "words", "cursor", {
         className: "keystrokes",
         defaultValue: function (el) {
            this.keystrokes = 0;
            el.innerHTML = "0 Keystrokes";
         },
         onUpdate: function (el) {
            el.innerHTML = ++this.keystrokes + " Keystrokes";
         }
      }], // Another optional usage, with a custom status bar item that counts keystrokes
      styleSelectedText: false,
      tabSize: 2,
      toolbar: ["preview", "|", "bold", "italic", "strikethrough", "|", "heading", "code", "|", "unordered-list", "ordered-list", "|", "link", "image", "|", "guide", "fullscreen"],
      toolbarTips: true
   })
})
