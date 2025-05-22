function drawShape(data) {
  if (!data || !data.html_css || !data.shape) {
    showNotification('Dữ liệu không hợp lệ.');
    return;
  }

  const shapeContainer = document.getElementById('shape-container');
  shapeContainer.innerHTML = data.html_css; // Chèn HTML/CSS trực tiếp
}

function displayResult(data) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = data.result || 'Không có kết quả.';
}
