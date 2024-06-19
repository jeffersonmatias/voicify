const selecaoVoz = document.querySelector("#selecao_voz");
const entradaTexto = document.querySelector("#entrada_texto");
const botaoOuvir = document.querySelector("#ouvir_btn");
const botaoBaixarTexto = document.querySelector("#baixar_texto_btn");
const uploadArquivo = document.querySelector("#upload_arquivo");

const fala = new SpeechSynthesisUtterance();

let vozesDisponiveis = [];

const atualizarValores = () => {
  vozesDisponiveis = window.speechSynthesis.getVoices();

  fala.voice = vozesDisponiveis[0];

  console.log(vozesDisponiveis);

  vozesDisponiveis.forEach((voz, index) => {
    const opcao = document.createElement("option");
    opcao.value = index;
    opcao.textContent = voz.name;
    selecaoVoz.appendChild(opcao);
  });
};

window.speechSynthesis.onvoiceschanged = atualizarValores;

selecaoVoz.addEventListener("change", () => {
  fala.voice = vozesDisponiveis[selecaoVoz.value];
});

botaoOuvir.addEventListener("click", () => {
  fala.text = entradaTexto.value;

  window.speechSynthesis.speak(fala);
});

botaoBaixarTexto.addEventListener("click", () => {
  const texto = entradaTexto.value;

  const blob = new Blob([texto], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "texto.txt";

  a.click();

  URL.revokeObjectURL(url);
});

uploadArquivo.addEventListener("change", (event) => {
  const arquivo = event.target.files[0];

  if (arquivo) {
    const leitor = new FileReader();

    leitor.onload = (e) => {
      entradaTexto.value = e.target.result;
    };

    leitor.readAsText(arquivo);
  }
});
