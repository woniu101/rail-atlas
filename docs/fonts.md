# 本地字体

网站使用 Google Fonts 官方仓库提供的 Noto 字体，下载后按当前源码进行字形子集化，并转换成 WOFF2。浏览页面不向 Google Fonts 或任何字体 CDN 发起请求。

| 本地文件 | CSS 字体名 | 原始字体 | 保留字重 | 用途 |
| --- | --- | --- | --- | --- |
| `public/fonts/rail-serif.woff2` | `Rail Serif` | Noto Serif SC | 700–800 | 站点标识、主标题与章节标题 |
| `public/fonts/rail-sans.woff2` | `Rail Sans` | Noto Sans SC | 400–500 | 正文、导航及界面标签 |

两个文件都保留对应字重范围的可变字体轴。请在 `@font-face` 中分别声明 `font-weight: 700 800` 和 `font-weight: 400 500`，并设置 `font-display: swap`。缺少的字形应回退到系统中文字体。

## 授权与来源

- Noto Serif SC：https://github.com/google/fonts/tree/main/ofl/notoserifsc
- Noto Sans SC：https://github.com/google/fonts/tree/main/ofl/notosanssc
- 两款字体采用 SIL Open Font License 1.1，完整许可和原始版权声明随字体保存在 `public/fonts/OFL-NotoSerifSC.txt`、`public/fonts/OFL-NotoSansSC.txt`。
- 子集字体的内部字体族已改为 `Rail Serif` 和 `Rail Sans`。字形来自原字体，本站仅裁剪字形、限制字重范围和转换格式。
- 构建记录、原字体 SHA-256、字形数量及体积见 `public/fonts/manifest.json`。

## 增加内容后的维护

子集涵盖 `src/` 内 Astro、TypeScript、Markdown、JSON、CSS 等文件里的所有字符、ASCII 及一组通用中文界面文案。新增车型和文章后，如包含新汉字，应重新生成，防止局部文字回退至系统字体。

```powershell
python -m pip install "fonttools[woff]"
python scripts/build-font-subsets.py
```

原字体下载到操作系统临时目录下的 `chinarail-font-cache`，不会进入网站发布目录。也可用 `--font-cache <目录>` 指定已有字体缓存，其中应包含 `NotoSerifSC.ttf` 和 `NotoSansSC.ttf`。首次下载需要网络，已有缓存时可离线生成。

脚本每次生成后重新打开 WOFF2，检查已请求且源字体支持的字形没有丢失。原字体本身缺少的符号会记录在清单中，交由系统字体回退；不影响常规中文阅读。
