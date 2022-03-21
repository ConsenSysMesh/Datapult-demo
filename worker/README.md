# Back-end service API for Datapult
This service uses CloudFlare as the primary service provider. It uses cloudflare Images, Workers, KV storage, and cache.

Domains are registered through DNSimple but DNS is managed through CloudFlare along with SSL certs

## Development

`yarn`

`wrangler login` if first time

`wrangler dev` for local/preview environment work

`wrangler publish` for production deployment


Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).
