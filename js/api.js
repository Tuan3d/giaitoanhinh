async function callGeminiAPI(input, customKey) {
  const apiKey = validateCustomKey(customKey);
  if (!apiKey) {
    showNotification('Key không hợp lệ. Vui lòng thử lại.');
    return null;
  }

  const prompt = `Giải bài toán hình học: "${input}". Trả về định dạng JSON: {result: chuỗi trả lời cho người dùng, html_css: mã HTML/CSS để vẽ hình trên khu vực 300x300 (dùng SVG hoặc canvas, không dùng hình ảnh ngoài), shape: loại hình (như "triangle", "circle", "rectangle")}. Không trả về bất kỳ mô tả văn bản, mã JavaScript, hoặc câu thừa nào ngoài JSON. Ví dụ: {result: "Diện tích: 6", html_css: "<svg width='300' height='300'><polygon points='100,100 200,100 150,200' fill='#00ff88'/></svg>", shape: "triangle"}`;
  
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
