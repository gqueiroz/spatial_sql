import "./style.scss";

const editor = ace.edit("aceeditor");
editor.focus();
editor.setTheme("ace/theme/solarized_dark");
editor.getSession().setMode("ace/mode/pgsql");

const input = document.querySelector('input[name="query"]');

editor.getSession().on("change", () => {
  const code = editor.getSession().getValue();
  input.value = code;
});
