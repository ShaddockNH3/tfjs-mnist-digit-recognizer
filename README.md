# ✍️ tfjs-mnist-digit-recognizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个基于网页的实时手写数字识别应用，使用 TensorFlow.js 构建。本项目经过特别优化，以实现跨平台兼容性，确保在桌面和移动设备上都能获得流畅且准确的体验。

**[✨ 在线演示 ✨](https://shaddocknh3.github.io/tfjs-mnist-digit-recognizer/)**

---

## 项目概述

本项目实现了一个卷积神经网络（CNN）模型，该模型在经典的 MNIST 数据集上进行训练，用于分类在 HTML 画布上绘制的手写数字（0-9）。

项目中解决的核心挑战是将 Keras/TensorFlow 模型成功部署到 Web 环境，并确保其在不同平台上的可靠运行，特别是解决了新版 Keras 与 TensorFlow.js 之间的兼容性问题。最终的解决方案采用了“图模型（Graph Model）”的方式，以实现在浏览器中进行稳健且高效的推理。

## 功能特性

- **实时预测**：当用户完成绘画后，模型会立即进行预测。
- **跨平台兼容**：在桌面端（鼠标输入）和移动端（触摸输入）均可无缝工作。
- **交互式画布**：一个简洁直观的绘画界面。
- **自定义训练模型**：CNN 模型完全在 Google Colab 环境中从零开始训练。

## 技术栈

- **前端**: HTML5, CSS3, JavaScript
- **机器学习库**: TensorFlow.js
- **模型训练**: Python, TensorFlow, Keras, Google Colab

---

## 快速上手与本地调试

要在您的本地计算机上运行此项目以进行调试或开发，请按照以下步骤操作。

1.  **克隆仓库：**
    ```bash
    git clone https://github.com/shaddocknh3/tfjs-mnist-digit-recognizer.git
    ```

2.  **进入项目目录：**
    ```bash
    cd tfjs-mnist-digit-recognizer
    ```

3.  **启动本地服务器：**
    这是一个纯前端项目，但由于浏览器的安全策略（CORS），加载模型时需要一个本地服务器。推荐的方式是使用 **Visual Studio Code** 的 **Live Server** 插件。
    -   在 VS Code 中安装 `Live Server` 插件。
    -   在 `index.html` 文件上单击右键，选择 `Open with Live Server`。
    -   您的浏览器将自动打开一个本地地址（例如 `http://127.0.0.1:5500`）并运行该应用。

---

## 部署指南

本项目可以通过多种方式部署，从临时的本地网络访问到完全公开的部署。

### 1. 临时局域网访问（用于移动端测试）

要在不公开发布的情况下在您的手机上测试此应用，您可以在本地网络中托管它。

1.  **确保网络连接**：确保您的电脑和手机连接到**同一个Wi-Fi网络**。
2.  **查找您的本地IP地址**：
    -   **Windows**: 打开命令提示符（`cmd`）并运行 `ipconfig`。在活动的Wi-Fi或以太网适配器下找到“IPv4 地址”（例如 `192.168.1.100`）。
    -   **macOS/Linux**: 打开终端并运行 `ifconfig | grep "inet "` 或 `ip a`。找到与您的活动网络接口关联的IP地址（例如 `192.168.1.100`）。
3.  **启动 Live Server**：如本地调试部分所述，使用 Live Server 启动项目。记下端口号（通常是 `5500`）。
4.  **从手机访问**：在手机浏览器中，访问 `http://<你的电脑IP>:<端口号>`（例如 `http://192.168.1.100:5500`）。

### 2. GitHub Pages 部署（推荐）

对于简单、免费且永久的公开部署，GitHub Pages 是完美的解决方案。

1.  **推送到 GitHub**：确保所有项目文件（`index.html`, `script.js`, `model/` 目录等）都位于您的 GitHub 仓库的根目录，并已完成推送。
2.  **配置 Pages**:
    -   导航到您的仓库的 **`Settings` (设置)** 选项卡。
    -   从左侧菜单中选择 **`Pages`**。
    -   在 "Build and deployment" (构建和部署) 下，将 "Source" (源) 设置为 **`Deploy from a branch` (从分支部署)**。
    -   将 "Branch" (分支) 设置为您的主分支（`main` 或 `master`），文件夹选择 `/(root)`。
    -   点击 **`Save` (保存)**。
3.  **等待发布**：等待 1-5 分钟以完成部署（您可以在 **`Actions`** 选项卡下监控进度）。您的网站将在 `https://<您的用户名>.github.io/<您的仓库名>/` 上线。

### 3. 公网服务器部署 (VPS/云服务器)

对于更高级的应用场景，您可以将项目部署到您自己的公网服务器（例如，来自 GitHub 学生开发包的服务器）。

1.  **连接到服务器**：使用 SSH 客户端连接到您的服务器。
    ```bash
    ssh 你的用户名@你的服务器IP
    ```
2.  **传输文件**：使用 `scp` 或 SFTP 客户端（如 FileZilla）等工具，将整个项目目录上传到服务器的网站根目录（在 Nginx/Apache 服务器上通常是 `/var/www/html`）。
3.  **配置Web服务器（如果需要）**：确保您的Web服务器（Nginx, Apache 等）已配置为从您上传项目的目录中提供静态文件。
4.  **访问**：该应用将在您服务器的公网IP地址或任何指向它的域名上可用。

---

## 模型训练

CNN 模型是在 Google Colab 环境中使用 TensorFlow 和 Keras 训练的。整个过程涉及解决重大的版本兼容性问题（特别是 Keras 3.x 与 TensorFlow.js 之间），最终通过将 Keras 模型转换为 TensorFlow SavedModel 格式，再进一步转换为 TF.js Graph Model 的方式得以解决。

有关详细的训练步骤，请参阅 `/training` 目录下的 Jupyter Notebook 笔记。