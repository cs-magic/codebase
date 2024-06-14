"use server"

export const serverFetch = async (
  url: string,
  cookie: string,
  method = "GET",
) => {
  console.log({ url, method, cookie })

  const res = await fetch(url, {
    method,
    body: new URLSearchParams({
      mid: "2651760926",
      sn: "d93bd8732116e0341d5a6fb79181778e",
      idx: "1",
      is_only_read: "1",
      album_id: "1296223588617486300",
      cur_album_id: "3295524480974569478",
    }),
    headers: {
      cookie,
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 NetType/WIFI MicroMessenger/6.8.0(0x16080000) MacWechat/3.8.7(0x13080710) XWEB/1191 Flue",
    },
  })
  const data = await res.json()
  console.log({ data })
  return data
}
