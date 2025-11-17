# 🎉 汉化版本部署指南

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

