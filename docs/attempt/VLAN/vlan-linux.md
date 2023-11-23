---
id: vlan-linux
sidebar_position: 0
sidebar_label: Linux 服务端搭建
description: Linux 服务端搭建
keywords: [虚拟局域网, 游戏联机, N2N]
---

# Linux 服务端搭建

## 前置准备

前置准备：一台轻量服务器即可，本文以阿里云的centos7服务器举例

## 服务端搭建

### 1. 安装docker

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

### 2. docker拉取N2N V3，并运行在7777端口

```bash
docker pull mjt233/n2n:v3
docker run -it --rm -p 7777:7777 -p 7777:7777/udp --name n2n mjt233/n2n:v3 supernode /etc/n2n/supernode.conf -f -v
```

### 3. 阿里云控制台防火期放开7777端口（TCP && UDP）

**至此完成服务端的搭建**
