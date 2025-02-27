/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    path: '/'
  },
  distDir: 'out'
}

module.exports = nextConfig 