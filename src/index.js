import "./style.scss";

let editor = ace.edit("aceeditor");
editor.focus();
editor.setTheme("ace/theme/solarized_dark");
editor.getSession().setMode("ace/mode/pgsql");

let input = document.querySelector('input[name="query"]');
console.log('input is' + input);

editor.getSession().on("change", () => {
  let code = editor.getSession().getValue();
  console.log('code is ' + code);
  input.value = code;
});
