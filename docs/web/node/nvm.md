---
id: nvm
sidebar_position: 1
sidebar_label: 使用nvm进行node版本控制
title: 使用nvm进行node版本控制
description: 使用nvm进行node版本控制
keywords: [nvm, 版本控制]
---

# 使用nvm进行node版本控制

## 安裝 NVM

可用 `cURL` 或 `wget` 指令使用安装脚本安装或更新 nvm：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

此安装脚本会将 nvm repo clone 到 `~/.nvm`，并且将 source line 新增至你的 profile 设置 ( `~/.bash_profile`、`~/.zshrc`、`~/.profile` 或 `~/.bashrc` )：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

## 常用的 NVM 命令

```bash
nvm ls // 查看目前安裝了哪些版本
nvm ls-remote // 查看所有可用的安装版本
nvm ls-remote --lts //列出可用的 LTS 版
nvm install node //安装最新node
nvm install 8.9.1 //安装具体版本
nvm use v10.6.3 // 切换版本
```
