/** @type {import('next').NextConfig} */
const nextConfig = {
  serverMinification: false,
  
};

module.exports = nextConfig;

module.exports = {
  output: "standalone",
  // serverMinification: false,
  // env: {
  //   NEXT_PUBLIC_SAS_URL: process.env.NEXT_PUBLIC_SAS_URL,
  // },
};
