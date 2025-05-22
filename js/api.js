async function callGeminiAPI(input, customKey) {
  const apiKey = validateCustomKey(customKey);
  if (!apiKey) {
    showNotification('Key không hợp lệ. Vui lòng thử lại.');
    return null;
  }

  const prompt = `Giải bài toán hình học: "${input}". Trả về định dạng JSON: {result: chuỗi hoặc số, shape: loại hình (như "triangle", "circle", "rectangle"), params: {tọa độ hoặc thông số để vẽ trên canvas 300x300}}. Không trả về mã HTML, CSS, JavaScript hoặc bất kỳ mô tả văn bản nào ngoài JSON. Ví dụ cho tam giác: {result: "Diện tích: 6", shape: "triangle", params: {points: [{x: 100, y: 100}, {x: 200, y: 100}, {x: 150, y: 200}]}}`;
  
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          response_mime_type: 'application/json'
        }
      })
    });
    const data = await response.json();
    return cleanResponse(data);
  } catch (error) {
    showNotification('Lỗi, Vui lòng kiểm tra key hoặc thử lại.');
    return null;
  }
}

function cleanResponse(data) {
  try {
    const jsonText = data.candidates[0].content.parts[0].text;
    const jsonMatch = jsonText.match(/{.*}/s);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  } catch (e) {
    showNotification('Dữ liệu không đúng định dạng.');
    return null;
  }
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.innerText = message;
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}
