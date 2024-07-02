import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
//////////////////////////////
// base
//////////////////////////////
export const smsProviderTypeAtom = atomWithStorage("sms.provider.type", "ali");
export const smsStageAtom = atom("toSendSms");
export const userPhoneAtom = atom("");
export const smsCodeAtom = atom("");
export const smsCodeToCountdownSecondsAtom = atomWithStorage("sms.code.countdown", 60);
export const smsCodeCurCountdownSecondsAtom = atom(0);
export const smsCodeExpireSecondsAtom = atom(10 * 60);
export const smsCodeSentOKAtom = atom(null);
//////////////////////////////
// derived
//////////////////////////////
export const smsSendCodePayloadAtom = atom((get) => ({
    phone: get(userPhoneAtom),
}));
export const smsSignInPayloadAtom = atom((get) => ({
    ...get(smsSendCodePayloadAtom),
    code: get(smsCodeAtom),
}));
