# 貪食蛇遊戲 - Snake Game

經典的貪食蛇遊戲，使用 HTML5 Canvas 製作，支援響應式設計和移動設備控制。

## 🌐 網站網址

- **GitHub Pages**: https://MF-Studio-lab.github.io/snake-game/
- **GitHub 儲存庫**: https://github.com/MF-Studio-lab/snake-game

## 📋 網站資訊

- **網站類型**: 遊戲網站
- **設計風格**: modern
- **頁面數量**: 1
- **生成日期**: 2026-05-05
- **生成工具**: Hermes Website Generator v1.2.0

## 🎮 遊戲特色

- 經典貪食蛇遊戲玩法
- 現代化 UI/UX 設計
- 響應式設計（支援桌面、平板、手機）
- **移動設備控制按鈕**（專為手機/平板設計）
- 分數系統
- 最高分記錄（使用 localStorage）
- 暫停/繼續功能
- 漸進式難度（速度隨分數增加）

## 🎨 設計特色

- 響應式設計（行動優先）
- 現代化 UI/UX
- 漸變色彩設計
- 流暢的動畫效果
- 清晰的視覺反饋
- **觸控優化的控制按鈕**

## 🛠️ 技術棧

- **HTML5**: 語義化標記
- **CSS3**: 現代化樣式、漸變、動畫、響應式設計
- **JavaScript**: 遊戲邏輯、Canvas 繪圖、觸控事件處理
- **HTML5 Canvas**: 遊戲畫面渲染
- **localStorage**: 最高分記錄
- **Touch Events**: 移動設備觸控支持
- **GitHub Pages**: 部署平台

## 🎯 遊戲玩法

### 控制方式

#### 桌面設備
- **方向鍵**: ↑ ↓ ← →
- **WASD**: W A S D
- **暫停/繼續**: 空格鍵

#### 移動設備（手機/平板）
- **虛擬方向按鈕**: 屏幕上的上、下、左、右按鈕
- **暫停/繼續**: 暫停按鈕

### 遊戲規則

1. 使用方向鍵、WASD 或虛擬按鈕控制蛇的移動
2. 吃掉紅色食物來增長蛇的長度和分數
3. 不要撞到牆壁或自己的身體
4. 按空格鍵或暫停按鈕暫停/繼續遊戲
5. 分數越高，蛇移動速度越快

### 計分規則

- 每吃一個食物：+10 分
- 最高分會自動保存到瀏覽器

## 📱 移動設備優化

### 響應式設計

- 自動適應不同屏幕尺寸
- 在手機和平板上顯示虛擬控制按鈕
- 觸控優化的按鈕設計
- 防止雙擊縮放

### 控制按鈕

- **上按鈕**: 控制蛇向上移動
- **下按鈕**: 控制蛇向下移動
- **左按鈕**: 控制蛇向左移動
- **右按鈕**: 控制蛇向右移動
- **暫停按鈕**: 暫停/繼續遊戲

### 觸控體驗

- 流暢的觸控反饋
- 防止誤觸
- 視覺反饋（按下時的動畫效果）

## 🚀 本地開發

### 安裝依賴

```bash
# 無需安裝依賴，純靜態網站
```

### 本地預覽

```bash
# 使用 Python 內建伺服器
cd snake-game
python3 -m http.server 8080

# 或使用 Node.js http-server
npx http-server -p 8080
```

訪問 http://localhost:8080

### 測試移動設備

```bash
# 使用 Chrome DevTools 模擬移動設備
# 1. 打開 Chrome 瀏覽器
# 2. 按 F12 打開開發者工具
# 3. 點擊設備工具欄按鈕（Ctrl+Shift+M）
# 4. 選擇移動設備（如 iPhone、iPad）
```

## 📦 部署

### 自動部署

```bash
# 使用標準化部署腳本
~/.hermes/skills/website-generator/scripts/deploy-to-github-pages.sh \
  "snake-game" \
  "經典貪食蛇遊戲，使用 HTML5 Canvas 製作，支援移動設備" \
  "/tmp/snake-game"
```

### 手動部署

1. 初始化 Git 儲存庫
2. 創建 GitHub 儲存庫
3. 推送代碼到 GitHub
4. 啟用 GitHub Pages

詳細步驟請參考 [GitHub Pages 標準化部署流程](https://github.com/MF-Studio-lab/snake-game/blob/main/references/github-pages-deployment-standard.md)

## 🧪 測試

```bash
# 執行 Playwright 測試
python3 ~/.hermes/skills/website-generator/scripts/tests/basic_tests.py .

# 執行視覺回歸測試
python3 ~/.hermes/skills/website-generator/scripts/tests/visual_regression.py .
```

## 📝 更新日誌

### v1.1.0 (2026-05-05)
- ✅ 添加移動設備控制按鈕
- ✅ 優化觸控體驗
- ✅ 添加暫停按鈕
- ✅ 改進響應式設計
- ✅ 防止雙擊縮放

### v1.0.0 (2026-05-05)
- ✅ 初始版本
- ✅ 使用 Hermes Website Generator 生成
- ✅ 實現基本貪食蛇遊戲功能
- ✅ 添加分數系統
- ✅ 添加最高分記錄
- ✅ 添加暫停/繼續功能
- ✅ 添加響應式設計

## 🤝 貢獻

歡迎提交問題和改進建議！

## 📄 許可證

MIT License

## 👤 作者

- **作者**: MF
- **電子郵件**: mf@twgreenpu.com
- **公司**: GREEN INDUSTRY CO., LTD.

## 📞 聯絡方式

- **網站**: https://www.twgreenpu.com/tw/index.html
- **YouTube**: https://www.youtube.com/@GREENINDUSTRYCOLTDPU
- **電子郵件**: info@twgreenpu.com

## 🙏 致謝

- 使用 [Hermes Website Generator](https://github.com/MF-Studio-lab/hermes-website-generator) 生成
- 部署在 [GitHub Pages](https://pages.github.com/)

---

**生成時間**: 2026-05-05 23:15:00
**生成工具**: Hermes Website Generator v1.2.0
**生成者**: Hermes Agent
