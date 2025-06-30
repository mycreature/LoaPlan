import { createLostarkInstance } from './instance'

export const getMarketData = async (apikey: string, itemName: string, itemCode: number) => {
  try {
    const instance = createLostarkInstance(apikey)

    const res = await instance.post('markets/items', {
      Sort: 'GRADE',
      CategoryCode: itemCode,
      ItemName: itemName,
      SortCondition: 'ASC',
    })
    console.log(`✅ ${itemName} 아이템 호출`, res.data)
    return res.data
  } catch (error) {
    console.error(`❌ ${itemName} 호출 실패`, error)
  }
}

export const getExpeditionData = async (apikey: string, Name: string) => {
  try {
    const instance = createLostarkInstance(apikey)
    const res = await instance.get(`characters/${Name}/siblings`)
    console.log(`✅ ${Name} 정보 호출`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 호출 실패`, error)
  }
}

export const getCharInfoData = async (apikey: string, Name: string, Filter?: string) => {
  try {
    const instance = createLostarkInstance(apikey)
    const res = await instance.get(`armories/characters/${Name}${Filter ? `/${Filter}` : ''}`)
    console.log(`✅ ${Name} 정보 호출`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 호출 실패:`, error)
  }
}

export const getCharProfile = async (apikey: string, Name: string) => {
  try {
    const instance = createLostarkInstance(apikey)

    const res = await instance.get(`armories/characters/${Name}/profiles`)
    console.log(`✅ ${Name} 프로필 호출`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 프로필 호출 실패:`, error)
  }
}
