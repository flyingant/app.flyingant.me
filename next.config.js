/** @type {import('next').NextConfig} */
const nextConfig = {  
  env: {
    app_name: 'app.flyingant.me',
    version: 'v0.0.1',
    BASE_API_URL: 'https://api.flyingant.me/api',
  },
  output: "export"
}

module.exports = nextConfig
