document.getElementById('generateButton').addEventListener('click', generateQRCode);

function generateQRCode() {
  // Obtém o valor do input
  const text = document.getElementById('textInput').value;

  // Verifica se o campo está vazio
  if (!text) {
    alert("Por favor, insira um texto ou URL.");
    return;
  }

  // Cria um novo QR Code
  const qr = qrcode(0, 'L'); // Tipo 0 (normal) e nível de correção de erro 'L'
  qr.addData(text);
  qr.make();

  // Insere o QR Code no elemento <div>
  const qrCodeElement = document.getElementById('qrcode');
  qrCodeElement.innerHTML = qr.createImgTag(6); // Tamanho da imagem (6 = escala)

  // Exibe o botão de download
  const downloadButton = document.getElementById('downloadButton');
  downloadButton.style.display = 'inline-block';

  // Adiciona o evento de download ao botão
  downloadButton.onclick = function () {
    downloadQRCode(qrCodeElement.querySelector('img'));
  };
}

function downloadQRCode(imageElement) {
  // Cria um link temporário para baixar a imagem
  const link = document.createElement('a');
  link.href = imageElement.src;
  link.download = 'qrcode.png'; // Nome do arquivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}