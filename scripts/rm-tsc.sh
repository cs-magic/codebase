#!/bin/bash

# 目标目录
target_dir="."

# 确保只删除与 .ts 文件同名的 .js 和 .d.ts 文件，跳过 node_modules、dist 目录
for ts_file in $(find "$target_dir" \( -type d -name "node_modules" -o -type d -name "dist" \) -prune -o -type f -name "*.ts" ! -name "*.d.ts" -print); do

    base_name=$(basename "$ts_file" .ts)
    dir_name=$(dirname "$ts_file")
    js_file="$dir_name/$base_name.js"
    dts_file="$dir_name/$base_name.d.ts"

    if [ -f "$js_file" ] || [ -f "$dts_file" ]; then
      echo "$dir_name/$base_name"
      rm -f "$js_file" "$dts_file"
    fi

done
