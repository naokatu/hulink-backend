# hulink-backend
## Getting Started

# .env ファイルを作成
```$ cp .env.local .env```

# パッケージをインストール
```$ yarn install```

# DB を起動
```$ make up```

# ローカルサーバーを起動
```$ yarn run start:dev```

# Docker 環境で開発する場合
### Docker Compose で full プロファイルを使用する
```$ export COMPOSE_PROFILES=full```