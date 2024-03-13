"use server"

import { prisma } from "../../common-db/providers/prisma/connection"
import { SMS_PROVIDER_ID } from "../const"
import { IProviderSendSms } from "../schema"

export const $sendSms = async (
  phone: string,
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

    const account = await prisma.account.upsert({
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
      },
    })
    console.log("[sms] account: ", account)
  }
  return ok
}
