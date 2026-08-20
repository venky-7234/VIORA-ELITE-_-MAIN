async function checkRedirect() {
  const url = 'https://www.pexels.com/video/6174519/download/';
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  };
  try {
    const res = await fetch(url, { headers, redirect: 'manual' });
    console.log("Status:", res.status);
    console.log("Headers:");
    for (const [key, val] of res.headers.entries()) {
      console.log(`${key}: ${val}`);
    }
  } catch (err) {
    console.error(err);
  }
}
checkRedirect();
