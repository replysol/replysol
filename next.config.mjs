/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost", "127.0.0.1"],

  webpack(config) {
    // encontra a regra padrão que trata imagens (inclui svg)
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // remove svg da regra padrão
    fileLoaderRule.exclude = /\.svg$/i;

    // adiciona SVGR pra transformar svg em componente
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
