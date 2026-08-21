<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Vérification Ticket</title>
  <style>
    body { background: #0a0a0a; color: white; font-family: Arial; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
    .box { background: #1a1a1a; padding: 40px; border-radius: 15px; text-align: center; width: 90%; max-width: 400px; }
    input { width: 90%; padding: 15px; font-size: 18px; border-radius: 8px; border: none; margin: 20px 0; }
    button { width: 100%; padding: 15px; font-size: 18px; background: #00ff88; color: black; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; }
    #message { margin-top: 20px; font-size: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="box">
    <h1>🎟️ Vérification Ticket</h1>
    <input type="text" id="code" placeholder="Entrez votre code">
    <button onclick="verifier()">VÉRIFIER</button>
    <div id="message"></div>
  </div>
<script>
async function verifier() {
  const code = document.getElementById('code').value;
  const msg = document.getElementById('message');
  msg.innerText = "Vérification...";
  const ipData = await fetch('https://ipapi.co/json/').then(r => r.json());
  const res = await fetch('/.netlify/functions/verify', {
    method: 'POST',
    body: JSON.stringify({ code: code, ip: ipData.ip, ville: ipData.city, pays: ipData.country_name })
  });
  const data = await res.json();
  msg.innerText = data.message;
  msg.style.color = data.ok? '#00ff88' : 'red';
}
</script>
</body>
</html>
