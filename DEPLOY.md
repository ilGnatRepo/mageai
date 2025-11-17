# 🎉 汉化版本部署指南（含语言切换器）

## ✅ 已完成的汉化工作

1. **国际化框架**
   - ✅ 安装并配置了 react-intl
   - ✅ 创建了 TranslationProvider
   - ✅ 集成了自动语言检测

2. **翻译文件**
   - ✅ `/mage_ai/frontend/pages/translations/en.json`（英文，835+ 行）
   - ✅ `/mage_ai/frontend/pages/translations/zh.json`（中文，835+ 行）

3. **语言切换器组件**
   - ✅ 创建了 LanguageSwitcher 组件
   - ✅ 已集成到主布局（显示在页面右上角）
   - ✅ 支持紧凑模式和完整模式

## 🚀 立即重新构建并部署

### 选项1：快速测试（本地开发）

```bash
# 1. 进入前端目录
cd /home/ilgnat/workFile/project/mage-ai/mage_ai/frontend

# 2. 启动开发服务器
npm run dev

# 3. 访问 http://localhost:3000
# 你应该能在右上角看到一个下拉菜单
# 选择 "中文" 或 "English" 切换语言
```

### 选项2：构建 Docker 镜像并部署

```bash
# 1. 确保在当前位置
cd /home/ilgnat/workFile/project/mage-ai

# 2. 构建前端静态文件（这会包含语言切换器）
cd mage_ai/frontend
yarn install --frozen-lockfile --network-timeout 1000000
yarn export_prod

# 3. 返回项目根目录
cd /home/ilgnat/workFile/project/mage-ai

# 4. 构建 Docker 镜像
docker build -f Dockerfile -t mage/data:v0.1 .

# 5. 运行容器
docker run -it \
  -p 6789:6789 \
  -v $(pwd):/home/src \
  mage/data:v0.3 \
  /app/run_app.sh mage \
  start mageai

# 6. 访问 http://localhost:6789
# 在右上角看到语言选择器

# 7. 查看日志（如果有问题）
docker ps  # 获取容器 ID
docker logs <container_id>
```

### 选项3：使用 Docker Compose（推荐）

```bash
# 1. 进入项目目录
cd /home/ilgnat/workFile/project/mage-ai

# 2. 重新构建前端并启动服务
docker-compose up --build -d server

# 3. 查看日志
docker-compose logs -f server

# 4. 访问 http://localhost:6789
```

## 📱 如何使用语言切换器

### 方法1：使用右上角的下拉菜单

部署后，在浏览器中：
1. 访问 http://localhost:6789
2. 在页面右上角找到语言选择器
3. 点击下拉菜单
4. 选择 "中文" 切换到中文
5. 选择 "English" 切换回英文

### 方法2：浏览器控制台（备用）

如果下拉菜单不显示，可以使用控制台：

```javascript
// 切换到中文
localStorage.setItem('mage-locale', 'zh')
location.reload()

// 切换到英文
localStorage.setItem('mage-locale', 'en')
location.reload()
```

### 方法3：浏览器语言设置（自动）

1. 将浏览器的首选语言设置为 "中文（简体）"
2. 清除浏览器缓存
3. 刷新页面
4. 系统会自动检测到中文并显示中文界面

## 🔍 验证汉化是否生效

### 验证点1：界面元素

- ✅ 导航菜单显示为中文（管道、触发器、运行等）
- ✅ 按钮显示为中文（保存、取消、删除等）
- ✅ 页面标题显示为中文

### 验证点2：功能正常

- ✅ 可以创建和编辑管道
- ✅ 可以运行管道
- ✅ 可以查看运行日志
- ✅ 语言切换功能正常工作

### 验证点3：语言切换

- ✅ 切换语言后页面立即刷新
- ✅ 所有文本都切换为目标语言
- ✅ 语言偏好被保存到 localStorage

## 🐛 常见问题及解决

### 问题1：语言切换器不显示

**原因**：
- 前端静态文件未重新构建
- Docker 镜像使用的是旧代码

**解决**：
```bash
# 重新构建前端
cd mage_ai/frontend
# yarn install
yarn export_prod

# 推送更新到镜像仓库
cd ../..
git add .
git commit -m "update something about Chinese localization"
git push origin master

# 重新构建 Docker 镜像
docker build --no-cache -f Dockerfile -t mage/data:v1.0 .

# 启动容器
docker run -it -p 6789:6789 -v $(pwd):/home/src mage/data:v1.0 /app/run_app.sh mage start mageai
```

### 问题2：切换语言后部分内容仍是英文

**原因**：
- 某些组件还未添加翻译
- API 返回的错误消息未汉化

**解决**：
- 这是正常的，汉化是一个渐进过程
- 可以告诉我哪些页面需要优先汉化

### 问题3：页面刷新后语言恢复为英文

**原因**：
- localStorage 被清除
- 浏览器设置问题

**解决**：
```javascript
// 在控制台中手动设置
localStorage.setItem('mage-locale', 'zh')
```

### 问题4：Docker 容器启动失败

**排查步骤**：

```bash
# 查看容器状态
docker ps -a

# 查看错误日志
docker logs <container_id>

# 常见问题：
# - 端口 6789 被占用：修改 -p 参数，如 -p 6790:6789
# - 权限问题：检查挂载的卷权限
# - 依赖问题：确保构建时没有错误
```

## 🎨 自定义语言切换器位置

如果你想将语言切换器移动到其他位置，可以：

### 移动到设置页面

1. 从 `_app.tsx` 中删除右上角的语言切换器
2. 在 `/home/ilgnat/workFile/project/mage-ai/mage_ai/frontend/pages/settings/index.tsx` 中添加：

```tsx
import LanguageSwitcher from '@components/Translation/LanguageSwitcher';

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <LanguageSwitcher />
    </div>
  );
}
```

### 移动到用户菜单

编辑用户菜单组件，在合适位置添加：

```tsx
<LanguageSwitcher compact showLabel={false} />
```

## 📊 已支持的翻译模块

目前汉化覆盖了以下模块：

- ✅ 通用操作（保存、删除、编辑等）
- ✅ 导航菜单
- ✅ 管道管理
- ✅ 触发器
- ✅ 运行记录
- ✅ 模板管理
- ✅ 文件管理
- ✅ 设置页面
- ✅ 错误信息
- ✅ SQL 相关术语
- ✅ API 文档术语
- ✅ 数据工程术语表

## 🚀 下一步建议

1. **测试所有主要功能**：确保汉化没有破坏任何功能
2. **收集反馈**：让其他用户试用并收集意见
3. **完善翻译**：根据反馈优化翻译内容
4. **添加更多语言**（如需要）：可以轻松添加其他语言
5. **考虑后端汉化**：API 错误消息也可以汉化

## 📚 相关文档

- 国际化开发指南：`/home/ilgnat/workFile/project/mage-ai/mage_ai/frontend/i18n-setup.md`
- 语言切换器使用示例：`/home/ilgnat/workFile/project/mage-ai/mage_ai/frontend/components/Translation/USAGE_EXAMPLE.md`
- Docker 部署指南：`/home/ilgnat/workFile/project/mage-ai/DEPLOY_WITH_LANG_SWITCHER.md`（本文档）

## 🆘 需要帮助？

如果遇到问题：
1. 检查浏览器控制台是否有错误
2. 查看 Docker 容器日志
3. 确认前端静态文件已正确构建
4. 在 GitHub 上提交 Issue 或寻求帮助

## 🎉 恭喜！

你现在拥有了一个支持中英文切换的 Mage AI 数据管道平台！
