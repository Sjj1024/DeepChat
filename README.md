<h4 align="right"> 
<a href="./docs/README.md">English</a> 
<a href="./docs/README_ZH.md" 
style="margin: 0 10px;" >简体中文</a> 
<a href="./docs/README_JP.md">日本语</a>
</h4>  
<p align="center">
    <img src="./docs/deepchat.png" width=138/>
</p>  
<h1 align="center">DeepChat</h1>  
<p align="center">
<strong>
DeepSeek, ChatGPT, and other centralized clients can be directly integrated using your API key, supporting voice and video conversation capabilities.
</strong>
</p>

## FAQ

1. Mac users may see an “App is damaged” warning on installation. click cancel and Run the following command, then reopen the app:

```sh
sudo xattr -r -d com.apple.quarantine /Applications/DeepChat.app
```

1. If you encounter any issues while using the program, please download the latest version, as versions developed before 2025 were based on Tauri v1.0. In 2025, Tauri was upgraded to v2.0. If the latest version still has issues, please submit an issue with detailed information so that we can update and resolve it more quickly.

## Developing DeepChat

If you want to develop DeepChat locally, ensure your environment is prepared beforehand. Make sure Rust `>=1.63` and Node `>=16` (e.g., `16.18.1`) are installed on your computer. For installation guidance, please refer to the [Tauri Documentation](https://v2.tauri.app/).

If you’re unfamiliar with these, it’s best to try the one-click packaging tool above.

```sh
# Install dependencies
pnpm i

# Local development [Right-click to open debug mode.]
pnpm run dev

# Package the app
pnpm run build


```

<!-- ## Support

# 1. wechat and group

# <p align="center" style="display:flex; justify-content: flex-start;" >

# <img src="./docs/mywx.png" width=300/>

# <img src="./docs/wxcode.png" width=300/>

# </p>

# 1. If DeepChat has brought joy to your life, feel free to support it.

# <p align="center" style="display:flex; justify-content: flex-start;">

# <img src="./docs/pay.png" width=620/>

# </p> -->
