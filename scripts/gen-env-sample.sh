#!/bin/sh

env_file_in="$1"
env_file_out=${env_file_in}.sample

# 转换.env文件到.env.sample，把值替换为空
if [ -f $env_file_in ]; then
    # 通过管道把.env文件的内容传给sed
    # 首先使用grep命令排除以#!开头的行
    # 然后用sed命令替换等号后的值为空
    # 参考：https://chat.openai.com/c/8a759c7f-a368-46ee-b4fd-827b87f8242c
    grep -v '^#!' $env_file_in | sed 's/=.*$/=/' | awk 'NR == 1 { prev = $0; print; next } { if ($0 != prev) { print } prev = $0 }' > $env_file_out

    # 将修改的.env.sample添加到暂存区 （但可能是额外的工作区）
#    git add $env_file_out
fi
