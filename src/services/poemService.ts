import { poetryStyles } from "../utils/poetryStyles";
import { generatePoemApi } from "@/request/api";
interface GeneratePoemRequest {
  style: string;
  prompt: string;
  theme?: string;
  length?: "short" | "medium" | "long";
}

interface PoemResponse {
  title: string;
  content: string;
  author: string;
  style: string;
  timestamp: number;
}

// Sample poems for different styles
const samplePoems = {
  shi: [
    {
      title: "春晓",
      content: "春眠不觉晓，\n处处闻啼鸟。\n夜来风雨声，\n花落知多少。",
      author: "孟浩然",
    },
    {
      title: "静夜思",
      content: "床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。",
      author: "李白",
    },
  ],
  ci: [
    {
      title: "念奴娇·赤壁怀古",
      content:
        "大江东去，\n浪淘尽，\n千古风流人物。\n故垒西边，\n人道是，\n三国周郎赤壁。",
      author: "苏轼",
    },
    {
      title: "雨霖铃",
      content:
        "寒蝉凄切，\n对长亭晚，\n骤雨初歇。\n都门帐饮无绪，\n留恋处，\n兰舟催发。",
      author: "柳永",
    },
  ],
  fu: [
    {
      title: "前赤壁赋",
      content:
        "壬戌之秋，\n七月既望，\n苏子与客泛舟游于赤壁之下。\n清风徐来，\n水波不兴。",
      author: "苏轼",
    },
    {
      title: "洛神赋",
      content:
        "黄初三年，\n余朝京师，\n还济洛川。\n古人有言，\n斯水之神，\n名曰宓妃。",
      author: "曹植",
    },
  ],
  qu: [
    {
      title: "山坡羊·潼关怀古",
      content: "峰峦如聚，\n波涛如怒，\n山河表里潼关路。\n望西都，\n意踌躇。",
      author: "张养浩",
    },
    {
      title: "天净沙·秋思",
      content:
        "枯藤老树昏鸦，\n小桥流水人家，\n古道西风瘦马。\n夕阳西下，\n断肠人在天涯。",
      author: "马致远",
    },
  ],
};

// Function to randomly select poems based on style
function getRandomPoem(style: string, prompt: string): PoemResponse {
  const styleSamples =
    samplePoems[style as keyof typeof samplePoems] || samplePoems.shi;
  const randomIndex = Math.floor(Math.random() * styleSamples.length);
  const selectedPoem = styleSamples[randomIndex];

  // In a real app, we'd send the prompt to a backend API
  // Here we just use the sample poems with the prompt mentioned in the title
  return {
    title: `${selectedPoem.title} · ${prompt}`,
    content: selectedPoem.content,
    author: selectedPoem.author,
    style: poetryStyles.find((s) => s.id === style)?.name || "诗",
    timestamp: Date.now(),
  };
}

// Mock API service
export async function generatePoem(
  request: GeneratePoemRequest
): Promise<PoemResponse> {
  // Simulate API delay
  console.log("generatePoem api", request);

  const response: {
    data: {
      outputs: {
        content: string;
        title: string;
        analysis: string;
      };
    };
  } = await generatePoemApi({
    inputs: {
      input1: "思乡", //主题
      input2: "五言绝句",
      input3: "李白", //风格
      input4: "伤感",
      input5: "荷花",
      input6: "", // 词牌名
    },
    response_mode: "blocking",
    user: "abc-123",
  });
  console.log("response", response);
  const content = response.data.outputs.content;
  const title = response.data.outputs.title;
  const analysis = response.data.outputs.analysis;
  return {
    title: title || "无题",
    content: content,
    author: "佚名",
    style: "",
    timestamp: Date.now(),
  };
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  return getRandomPoem(request.style, request.prompt);
}

// Get user's poem history (would be stored in localStorage or a database in a real app)
export function getPoemHistory(): PoemResponse[] {
  const historyJson = localStorage.getItem("poemHistory");
  if (historyJson) {
    try {
      return JSON.parse(historyJson);
    } catch (e) {
      console.error("Failed to parse poem history", e);
    }
  }
  return [];
}

// Save a poem to history
export function savePoemToHistory(poem: PoemResponse): void {
  const history = getPoemHistory();
  history.unshift(poem); // Add to beginning of array

  // Keep only the 10 most recent poems
  const trimmedHistory = history.slice(0, 10);

  localStorage.setItem("poemHistory", JSON.stringify(trimmedHistory));
}
