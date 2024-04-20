import { api } from "../../../../packages/api-client/api"

const url =
  "http://mp.weixin.qq.com/s?__biz=Mzk0NTYzNDQ5NQ==&amp;mid=2247489081&amp;idx=1&amp;sn=aee974da3c779724e14d696f56e5aaa3&amp;chksm=c3133be9f464b2ff29beeb25445a0122dc2bebfe15b3dab9645a35e327582fd6bb8d82f58bc0&amp;mpshare=1&amp;scene=1&amp;srcid=0420kPkYDU8MwWwmwp2Vpzw2&amp;sharer_shareinfo=78759ff0d3165b92a3a404d7899f48fd&amp;sharer_shareinfo_first=78759ff0d3165b92a3a404d7899f48fd#rd"

const fun = async () => {
  const { data: text } = await api.get<string>(url)

  console.log(text)
}

void fun()
