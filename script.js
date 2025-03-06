document.getElementById('generateButton').addEventListener('click', generateQRCode);

function generateQRCode() {
  // Obtém o valor do input
  const text = document.getElementById('textInput').value;

  // Verifica se o campo está vazio
  if (!text) {
    mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, insira um texto ou URL válido para gerar o QR Code.");
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

  mostrarAlertaPersonalizado("✅ QR Code Criado com Sucesso!", "Seu QR Code foi gerado e está pronto para uso! Agora você pode compartilhá-lo ou fazer o download da imagem.")
}

function downloadQRCode(imageElement) {
  // Cria um link temporário para baixar a imagem
  const link = document.createElement('a');
  link.href = imageElement.src;
  link.download = 'qrcode.png'; // Nome do arquivo
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  mostrarAlertaPersonalizado("📥 Download Concluído!", "A imagem do QR Code foi baixada com sucesso. Verifique sua pasta de downloads para acessá-la.")
}

//=========== Alçerta Personalizado =============

function mostrarAlertaPersonalizado(titulo, mensagem) {
  // Cria o overlay (fundo escurecido)
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '1000';

  // Cria a caixa do alerta
  const alertaBox = document.createElement('div');
  alertaBox.style.backgroundColor = '#fff';
  alertaBox.style.padding = '20px';
  alertaBox.style.borderRadius = '10px';
  alertaBox.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
  alertaBox.style.maxWidth = '400px';
  alertaBox.style.width = '100%';
  alertaBox.style.textAlign = 'center';

  // Cria o título
  const tituloElemento = document.createElement('h2');
  tituloElemento.textContent = titulo;
  tituloElemento.style.marginTop = '0';
  tituloElemento.style.fontSize = '24px';
  tituloElemento.style.color = '#333';

  // Cria a mensagem
  const mensagemElemento = document.createElement('p');
  mensagemElemento.textContent = mensagem;
  mensagemElemento.style.fontSize = '16px';
  mensagemElemento.style.color = '#666';
  mensagemElemento.style.margin = '20px 0';

  // Cria o botão de fechar
  const botaoFechar = document.createElement('button');
  botaoFechar.textContent = 'Fechar';
  botaoFechar.style.backgroundColor = '#007bff';
  botaoFechar.style.color = '#fff';
  botaoFechar.style.border = 'none';
  botaoFechar.style.padding = '10px 20px';
  botaoFechar.style.borderRadius = '5px';
  botaoFechar.style.cursor = 'pointer';
  botaoFechar.style.fontSize = '16px';
  botaoFechar.onclick = function () {
      document.body.removeChild(overlay); // Remove o alerta ao clicar no botão
  };

  // Adiciona os elementos à caixa do alerta
  alertaBox.appendChild(tituloElemento);
  alertaBox.appendChild(mensagemElemento);
  alertaBox.appendChild(botaoFechar);

  // Adiciona a caixa do alerta ao overlay
  overlay.appendChild(alertaBox);

  // Adiciona o overlay ao body
  document.body.appendChild(overlay);
}

// Exemplo de uso:
// mostrarAlertaPersonalizado('Título do Alerta', 'Esta é uma mensagem de exemplo.');
