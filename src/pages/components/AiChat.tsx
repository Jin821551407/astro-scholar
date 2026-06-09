// src/components/AiChat.jsx
import { CozeWebSDK } from "@coze/web-sdk/react";

export const AiChat = () => {
  // 建议从环境变量读取 Token
  const token = import.meta.env.PUBLIC_COZE_TOKEN || 'pat_你的Token';

  return (
    // 关键：添加这个外层 div，使用 fixed 定位让它脱离文档流
    <div
      style={{
        marginTop: "20px",
        height: "600px", // 设置高度
        borderRadius: "12px",
        overflow: "hidden", // 防止圆角溢出
      }}
    >
      <CozeWebSDK
        projectId="7647730928730751016"
        refreshToken={() => Promise.resolve('pat_JPGzpxM2McBnZDsne1VKhWqhb4X4mnHS3pdRRgVHiS0YWm9mTfF9U4ZQFfXGi0sq')}
      />
    </div>
  );
}