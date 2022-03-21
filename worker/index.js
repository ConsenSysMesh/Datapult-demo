import { Router } from 'itty-router';
import { Buffer } from 'buffer';

const cardRoot = CARD_ROOT || 'http://127.0.0.1:8787';

const web3Url = (cid) => `https://${cid}.ipfs.dweb.link`;
const cachedUrl = (cacheId) => `https://imagedelivery.net/${CF_ACCOUNT_ID}/${cacheId}`;

async function sha1(file) {
  const fileData = await file.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-1', fileData);
  const array = Array.from(new Uint8Array(digest));
  const theSHA1 = array.map((b) => b.toString(16).padStart(2, '0')).join('');
  return theSHA1;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const html = (meta) => {
  console.log('Meta', meta);
  const title = meta.title || '';
  const descr = meta.descr || '';
  const cUrl = cachedUrl(meta.cacheId);
  const wUrl = web3Url(meta.cid);

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
      />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <meta name="robots" content="noindex, follow" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title}" />
      <meta name="twitter:description" content="${descr}" />
      <meta name="twitter:image" content="${cUrl}/twitter" />
      <meta property="twitter:image:width" content="1024" />
      <meta property="twitter:image:height" content="512" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${descr}" />
      <meta property="og:image" content="${cUrl}/fb" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="description" content="${descr}">
      <title>${title}</title>
      <style>
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Titillium+Web:ital,wght@1,600;1,700&display=swap');
      body {
        font-family: 'Roboto', sans-serif;
        padding: 5px;
        background-color: black ;
        color: #FBF6F0;
      }
      a {
        color: #CC3B1E;
        text-decoration: underline;
        overflow-wrap: break-word;
        padding: 0.3em;
        font-size: 1.3em;
      }
      h1 {
        font-size: 2em;
        margin: 0.5em;
        font-weight: bold;
      }
      h2 {
        font-size: 1.5em;
        margin: 0.3em;
        font-weight: bold;
      }
      h3 {
        font-size: 1.2em;
        margin: 0.2em;
        margin-bottom: 4em;
      }
      .preview {
        text-align: center;
        margin: auto;
      }
      .preview > img {
        margin: 0px;
        border: 1px solid #dadada;
        width: 100%;
        height: 100%;
      }
      p {
        font-size: 1.2em;
      }
      .meta {
        text-align: left;
        font-size: 1.3em;
        border: 1px solid #dadada;
        border-bottom: 0px;
        margin-top: 1.5em;
        background-color: #fafafa;
        color: black;
        padding: 0.2em 0.2em 0.2em 0.4em;
      }
      footer {
        margin-top: 2em;
        font-size: 1em;
      }
      .funky {
        color: #f35626;
        background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-animation: hue 5s infinite linear;
      }
      @-webkit-keyframes hue {
          from {
            -webkit-filter: hue-rotate(0deg);
          }
  
          to {
            -webkit-filter: hue-rotate(360deg);
          }
      }
      </style>
    </head>
    <body>
      <div class="preview">
        <h1>
        Your requested image is currently being Datapulted&#8482; to <span class="funky">decentralized</span> storage.
        </h1>
        <div class="meta">
          <p>
          <b>${title}</b><br/>
          <i>${descr}</i>
          </p>
        </div>
        <img src="${cUrl}/preview"
            alt="${descr}"
            title="${title}"
            />
        <p>
          You will be redirected to the permanent home shortly or click the link below
          <br/>
          <a href="${wUrl}">${wUrl}</a>
        </p>
        <footer>
          Image relay services provided by <a style="color: #CC3B1E" href="https://datapult.site">Datapult</a>
          <br/>
          File storage services provided by <a style="color: #CC3B1E" href="https://web3.storage">Web3.storage</a>
        </footer>
      </div>
      <script>
      var image = new Image();
      image.onload = function(){
        location.href = "${wUrl}";
      };
      image.src = "${wUrl}";
      setTimeout('location.href = "${wUrl}";',60000);
      </script>
    </body>
  </html>  
`;
};

// Create a new router
const router = Router();

router.get('/', () => new Response(`Hello, this is Datapult (${CARD_ROOT}). Visit https://datapult.site to try it out.`));

// Handle the service requests for the card header meta data 
// If request is from a browser show the loading page and then redirect to the IPFS location
router.get('/c/:shortKey', async ({ params }) => {
  console.log('Req Params', params);

  const meta = await CARDS_KV.get(`card:${params.shortKey}`);
  console.log('KV result', meta);

  if (meta) {
    const metaJson = await JSON.parse(meta);
    return new Response(html(metaJson), {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        ...corsHeaders,
      },
    });
  }
  return new Response('404, not found!', { status: 404 });
});

// Get the Status of the image from the web3storage api
router.get('/s/:shortKey', async ({ params }) => {
  const W3B_API_KEY = await CARDS_KV.get('W3B_API_KEY');

  console.log('Req Params', params);

  const meta = await CARDS_KV.get(`card:${params.shortKey}`);
  console.log('KV result', meta);

  if (meta) {
    const metaJson = await JSON.parse(meta);

    const w3Init = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${W3B_API_KEY}`,
      },
    };

    const w3Response = await fetch(`https://api.web3.storage/status/${metaJson.cid}`, w3Init);
    console.log("web3 response ", w3Response.statusText, w3Response.status);
    const w3resp = await w3Response.json();

    return new Response(await JSON.stringify(w3resp), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        ...corsHeaders,
      },
    });
  }
  return new Response('404, not found!', { status: 404 });
});

router.get('/recent', async () => {
  const cards = await CARDS_KV.get('RECENT_CARDS');
  return new Response(cards, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      ...corsHeaders,
    },
  });
});

router.post('/upload', async (request) => {
  const W3B_API_KEY = await CARDS_KV.get('W3B_API_KEY');
  const CFIMG_API_KEY = await CARDS_KV.get('CFIMG_API_KEY');

  const contentType = request.headers.get('Content-Type');
  console.log('ContentType Header', contentType);

  let file;
  let filename = 'image.jpg';
  let title;
  let descr;

  if (contentType.toLowerCase() === 'application/json') {
    const jsonData = await request.json();

    const buf = Buffer.from(jsonData.file, 'base64');
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
    }
    filename = jsonData.filename;
    file = new File([ab], filename);
    title = jsonData.title;
    descr = jsonData.descr;
    console.log('Json metadata', { filename, title, descr });
  } else {
    // Parse the request to FormData
    const formData = await request.formData();
    // Get the File from the form. Key for the file is 'image' for me
    file = formData.get('file');
    title = formData.get('title');
    descr = formData.get('descr');
  }

  const hash = await sha1(file);

  const form = new FormData();
  form.append('file', file, filename);

  const cfInit = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${CFIMG_API_KEY}`,
    },
    body: form,
  };

  const cfResponse = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CFIMG_ACCOUNT_ID}/images/v1`,
    cfInit,
  );
  console.log("CF response ", cfResponse.statusText, cfResponse.status);
  const cfJson = await cfResponse.json();

  const w3Init = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${W3B_API_KEY}`,
      'X-name': `${hash}.jpg`,
    },
    body: form,
  };

  const w3Response = await fetch('https://api.web3.storage/upload', w3Init);
  console.log("web3 response ", w3Response.statusText, w3Response.status);
  const w3resp = await w3Response.json();

  const shortKey = w3resp.cid.slice(-10);

  const meta = {
    name: file.name || 'unknown.jpg',
    title,
    descr,
    type: file.type || 'image/jpg?',
    storageSize: file.size || 'unknown',
    shortKey: w3resp.cid.slice(-10),
    cacheId: cfJson.result.id,
    cid: w3resp.cid,
    hash,
  };

  const cardUrl = `${cardRoot}/c/${shortKey}`;

  // Store meta under shortkey in KV
  await CARDS_KV.put(`card:${shortKey}`, await JSON.stringify(meta));

  const resBody = JSON.stringify({
    web3Url: web3Url(meta.cid),
    cacheUrl: cachedUrl(meta.cacheId),
    shareUrl: cardUrl,
    ...meta,
  });

  console.log('Response', resBody);

  return new Response(resBody, {
    headers: {
      'Content-Type': 'application/json',
      //'Content-Type': 'text/html;charset=UTF-8',
      ...corsHeaders,
    },
  });
});

router.all('*', () => new Response('404, not found!', { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});
