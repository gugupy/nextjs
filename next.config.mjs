/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nextjs',
  output: 'export',
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
