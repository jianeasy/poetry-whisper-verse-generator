import req from "./index";

// 请求工作流
export const generatePoemApi = (data: {
  inputs: {
    input1: string;
    input2: string;
    input3: string;
    input4: string;
    input5: string;
    input6: string;
  };
  response_mode: string;
  user: string;
  maxBodyLength?: number;
}) => {
  return req.request({
    method: "post",
    url: "https://api-agent.codejoyai.com/v1/workflows/run",
    data: JSON.stringify(data),
    headers: {
      Authorization: `Bearer app-pnTK7RhiVTPTf61n92PxNgz1`,
      "Content-Type": "application/json",
    },
  });
};
