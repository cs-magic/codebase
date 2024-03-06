"use server"

import { db } from "../../db"
import { SMS_PROVIDER_ID } from "../const"
import { IProviderSendSms, ISmsSignIn } from "../schema"

export const $sendSms = async (
  phone: string,
  name: string,
  expireSeconds: number,
  sendApproach: IProviderSendSms,
) => {
  const code = Math.random().toString().slice(2, 8)

  const ok = await sendApproach(phone, code, expireSeconds)

  if (ok) {
    // todo: link account

    const id = {
      providerAccountId: phone,
      provider: SMS_PROVIDER_ID,
    }
    const access_token = code
    const expires_at = Date.now() / 1e3 + expireSeconds

    const account = await db.account.upsert({
      where: {
        provider_providerAccountId: id,
      },
      create: {
        ...id,
        type: "credentials",
        access_token,
        expires_at,

        user: {
          create: {
            name,
            /**
             * jwt not need this session
             */
            // sessions: {
            //   create: {
            //     sessionToken: v4(),
            //     expires: moment().add(10, "m").toDate(),
            //   },
            // },
          },
        },
      },
      update: {
        access_token,
        expires_at,
        user: {
          update: {
            data: {
              name,
            },
          },
        },
      },
    })
    console.log("[components] account: ", account)
  }
  return ok
}

export const $smsSignIn = async (values: ISmsSignIn) => {
  const { phone, code } = values
  const account = await db.account.findUnique({
    where: {
      provider_providerAccountId: {
        providerAccountId: phone,
        provider: SMS_PROVIDER_ID,
      },
      access_token: code,
    },
    include: { user: true },
  })

  if (!account) throw new Error("account not found")

  const user = account.user

  console.log("[components] signed in user: ", user)
  return user
}
