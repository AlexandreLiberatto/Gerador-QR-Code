document.getElementById('generateButton').addEventListener('click', generateQRCode);
document.getElementById('clearButton').addEventListener('click', clearFields);

function clearFields() {
    document.getElementById('titleInput').value = '';
    document.getElementById('textInput').value = '';
    document.getElementById('qrcode').innerHTML = '';
    document.getElementById('qr-title').textContent = '';
    document.getElementById('downloadButton').style.display = 'none';
    mostrarAlertaPersonalizado("🗑️ Campos Limpos!", "Todos os campos foram limpos com sucesso!");
}

function generateQRCode() {
    const text = document.getElementById('textInput').value;
    const title = document.getElementById('titleInput').value;

    if (!text) {
        mostrarAlertaPersonalizado("⚠️ Atenção!", "Por favor, insira um texto ou URL válido para gerar o QR Code.");
        return;
    }

    // Cria um novo QR Code
    const qr = qrcode(0, 'L');
    qr.addData(text);
    qr.make();

    // Prepara o container do QR Code
    const qrCodeElement = document.getElementById('qrcode');
    qrCodeElement.innerHTML = '';

    // Cria um elemento canvas temporário para gerar a imagem com título
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Define o tamanho base do QR Code
    const qrSize = 200;
    const padding = title ? 40 : 0; // Espaço para o título
    
    // Configura o tamanho do canvas
    canvas.width = qrSize;
    canvas.height = qrSize + padding;
    
    // Fundo branco
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Adiciona o título se existir
    if (title) {
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(title, canvas.width / 2, 10);
    }

    // Cria a imagem do QR Code
    const qrImage = new Image();
    qrImage.onload = function() {
        // Desenha o QR Code
        ctx.drawImage(qrImage, 0, padding, qrSize, qrSize);
        
        // Cria a div para o título entre os códigos
        if (title) {
            const titleDiv = document.createElement('div');
            titleDiv.className = 'qr-code-title';
            titleDiv.textContent = title;
            qrCodeElement.appendChild(titleDiv);
        }
        
        // Adiciona a imagem final
        const finalImage = document.createElement('img');
        finalImage.src = canvas.toDataURL('image/png');
        qrCodeElement.appendChild(finalImage);
        
        // Exibe o botão de download
        const downloadButton = document.getElementById('downloadButton');
        downloadButton.style.display = 'inline-block';
        
        // Adiciona o evento de download ao botão
        downloadButton.onclick = function() {
            const fileName = title ? `${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-qrcode.png` : 'qrcode.png';
            downloadQRCode(finalImage, fileName);
        };

        mostrarAlertaPersonalizado("✅ QR Code Criado com Sucesso!", "Seu QR Code foi gerado com o título e está pronto para uso!");
    };

    // Cria um elemento temporário para obter a URL do QR Code
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = qr.createImgTag(10);
    const tempImg = tempDiv.querySelector('img');
    qrImage.src = tempImg.src;
}

function downloadQRCode(imageElement, fileName) {
  const link = document.createElement('a');
  link.href = imageElement.src;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  mostrarAlertaPersonalizado("📥 Download Concluído!", "A imagem do QR Code foi baixada com sucesso. Verifique sua pasta de downloads para acessá-la.");
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
