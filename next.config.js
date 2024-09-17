/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        token: process.env.S3_BUCKET
    },
    optimizeFonts: false,
}

module.exports = nextConfig
