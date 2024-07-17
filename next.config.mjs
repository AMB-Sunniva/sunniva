/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

// next.config.mjs;

// import autoCert from "anchor-pki/auto-cert/integrations/next";

// const withAutoCert = autoCert({
//   enabledEnv: "development",
// });

// // const nextConfig = {};

// export default withAutoCert(nextConfig);
