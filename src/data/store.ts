import { atom } from 'jotai'
import { atomWithStorage, createJSONStorage } from 'jotai/utils'
const storage = createJSONStorage(() => localStorage)
export const profileDetailsAtom = atomWithStorage(
  'profileDetails',
  {
    age: '',
    nationality: '',
    matrimonialStatus: '',
    profession: '',
    gender: '',
    ethnicity: '',
    qualification: '',
  },
  storage,
  { getOnInit: true }
)

export const pledgeAmountAtom = atomWithStorage('pledgeAmount', 50, storage, { getOnInit: true })
export const countryInfoAtom = atomWithStorage('countryInfo', null, storage, { getOnInit: true })
export const phoneNumberAtom = atomWithStorage('phoneNumber', null, storage, { getOnInit: true })
export const userPrefIdAtom = atomWithStorage('userPrefId',null, storage, { getOnInit: true })
export const accessTokenAtom = atomWithStorage('accessToken', null, storage, { getOnInit: true })
export const selectedCauseAtom = atomWithStorage('selectedCause', null, storage, { getOnInit: true })
export const currentQuestionId = atom(0)
export const initatePaymentAtom = atomWithStorage('initatePayment', {
    txnid: '',
    amount: '',
    firstname: '',
    email: '',
    productinfo: '',
    phone: '',
} , storage , {getOnInit:true})