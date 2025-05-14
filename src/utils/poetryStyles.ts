
export type PoetryStyle = {
  id: string;
  name: string;
  description: string;
  era: string;
  structure: string;
  example: string;
};

export const poetryStyles: PoetryStyle[] = [
  {
    id: "shi",
    name: "诗",
    description: "传统五言或七言诗，格律严谨，声韵和谐。",
    era: "唐朝",
    structure: "五言或七言，一般由四句或八句组成。",
    example: "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
  },
  {
    id: "ci",
    name: "词",
    description: "格律灵活多变，长短句兼备，抒发细腻情感。",
    era: "宋朝",
    structure: "有固定词牌格式，如《水调歌头》、《念奴娇》等。",
    example: "明月几时有？把酒问青天。不知天上宫阙，今夕是何年。",
  },
  {
    id: "fu",
    name: "赋",
    description: "文辞华丽，骈散结合，多用于描写景物。",
    era: "汉朝",
    structure: "篇幅较长，对仗工整，节奏明快。",
    example: "霜落熊蛮，风号鸟革，蜀山兀，阿房出。",
  },
  {
    id: "qu",
    name: "曲",
    description: "更加通俗易懂，口语化程度高，多为戏曲唱段。",
    era: "元朝",
    structure: "有散曲和套曲，音律自由，押韵较松。",
    example: "风萧萧兮易水寒，壮士一去兮不复还。",
  }
];

export function getPoetryStyleById(id: string): PoetryStyle | undefined {
  return poetryStyles.find((style) => style.id === id);
}
