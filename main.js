let currentCustomKey = null;

document.getElementById('save-key').addEventListener('click', () => {
  const keyInput = document.getElementById('api-key').value;
  if (keyInput) {
    currentCustomKey = keyInput;
    showNotification('Key đã được lưu.');
  } else {
    showNotification('Vui lòng nhập key.');
  }
});

document.getElementById('geometryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('input').value;
  if (!currentCustomKey) {
    showNotification('Vui lòng nhập key trước.');
    return;
  }
  const data = await callGeminiAPI(input, currentCustomKey);
  if (data) {
    drawShape(data);
    displayResult(data);
  }
});

document.getElementById('telegram-bubble').addEventListener('click', () => {
  showNotification('Zalo, Tele: 0375320855');
});

// Hiển thị phiên bản
document.getElementById('version').innerText = `Phiên bản: ${APP_VERSION}`;
