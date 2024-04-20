# Fonts

## Build on Ubuntu

如果不在系统级别安装的话，就会很慢。

当然，如果希望用户在不同设备、浏览器上始终一样的字体体验，就不得不在网络请求中加入字体了。。

目前这个适合后端程序使用。

```shell
# if not exists
mkdir ~/.fonts

cp path/to/example.ttf ~/.fonts/

# sync
fc-cache -fv

# check
fc-list | grep "example"

```

ref: Linux字体问题解决, https://chat.openai.com/c/f7ae90f5-9820-4163-a5bf-f9687db0d1cb
