#!/bin/bash

# ref: https://chat.openai.com/c/b61758d1-e4fa-4cfe-95cf-2534c4281488
awk 'BEGIN{FS=OFS="\""} /"version": "V/ {
    split($4, a, " \\(");  # 使用转义符 \ 来处理左括号
    split(a[1], b, ".");
    b[3]++;
    $4 = b[1] "." b[2] "." b[3] " (" a[2]  # 重建包含后缀的版本号
} 1' package.json > temp.json && mv temp.json package.json
