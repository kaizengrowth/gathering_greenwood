export default async function handler(req, res) {
  const { path } = req.query;
  const apiUrl = `http://172.232.24.146/api/${path || ''}`;
  
  const url = new URL(apiUrl);
  url.search = new URLSearchParams(req.query).toString();
  
  try {
    const response = await fetch(url.toString(), {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });
    
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from backend' });
  }
}
