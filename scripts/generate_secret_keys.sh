<<note
- shell
  multiple line comment: https://www.geeksforgeeks.org/multi-line-comment-in-shell-script/
  concat string: https://stackoverflow.com/a/33139133
  function: https://www.gnu.org/software/bash/manual/html_node/Shell-Functions.html
- jwt
  - online
    online rsa key generator: http://travistidwell.com/jsencrypt/demo/
  - manual
    generate rsa key/pub: https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
    avoid passphrase: https://unix.stackexchange.com/a/255833
- base64
  base64 encode: https://superuser.com/a/120815
- trpc-nextjs-prisma
  generate rsa keys: https://codevoweb.com/trpc-api-with-reactjs-nodejs-access-and-refresh-tokens/
note


f=~/rsa.key
f2=${f}.pub
e=.env


gen() {
  ssh-keygen -t rsa -b 2048 -m PEM -P "" -q -f ${f} <<<y
  cat ${f} | base64 | tr -d \\n | echo "${type}_TOKEN_PRIVATE_KEY=$(cat -)" >>${e}

  openssl rsa -in ${f2} -pubout -outform PEM -out ${f2}
  cat ${f2} | base64 | tr -d \\n | echo "${type}_TOKEN_PUBLIC_KEY=$(cat -)" >>${e}
}

type=ACCESS && gen
type=REFRESH && gen
