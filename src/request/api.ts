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

//保存文章
export const savePoemApi = (data: {
  toolName: string;
  toolType: string;
  setting: string;
}) => {
  const userId = localStorage.getItem("userId") || "test1";
  return req.request({
    method: "post",
    url: "https://aitool.codejoyai.com/aitool_api/tool/createLog",
    // url: "http://localhost:4040/api/tool/createLog",
    data: data,
    headers: {
      platform: "lndx",
      userId: userId,
    },
  });
};

// 收藏诗词
export const collectPoemApi = (data: { uuid: string }) => {
  return req.request({
    method: "post",
    url: "https://aitool.codejoyai.com/aitool_api/tool/collection",
    // url: "http://localhost:4040/api/tool/collection",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 取消收藏
export const cancelCollectPoemApi = (data: { uuid: string }) => {
  return req.request({
    method: "post",
    url: "https://aitool.codejoyai.com/aitool_api/tool/cancelCollection",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 获取收藏的列表
export const getCollectPoemListApi = (data: {
  page: number;
  pageSize: number;
  toolName: string;
}) => {
  const userId = localStorage.getItem("userId") || "test1";

  return req.request({
    method: "post",
    url: "https://aitool.codejoyai.com/aitool_api/tool/collectionList",
    // url: "http://localhost:4040/api/tool/collectionList",
    data: data,
    headers: {
      platform: "lndx",
      userId: userId,
    },
  });
};
