import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许从非 localhost 来源访问 dev server（如远程/端口转发 192.168.204.1），
  // 否则 Next.js 16 会拦截跨源开发资源，页面只剩裸 HTML（线框、切不了主题、画布不挂载）。
  allowedDevOrigins: ["192.168.204.1", "localhost", "127.0.0.1"],
};

export default nextConfig;
