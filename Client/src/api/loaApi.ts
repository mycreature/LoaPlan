import { createLostarkInstance } from './instance'
import categoryCode from '../constants/categoryCode.json'

export const getItemData = async (
  apikey: string,
  itemName: string,
  CategoryCode?: number,
  pageNo?: number,
) => {
  const instance = createLostarkInstance(apikey)

  // CategoryCode가 없는 경우 -> 하나씩 API 호출해서 찾기
  if (!CategoryCode) {
    for (const category of categoryCode.Categories) {
      if (!category.Code) continue

      try {
        const res = await instance.post('markets/items', {
          Sort: 'GRADE',
          CategoryCode: category.Code,
          ItemName: itemName || '',
          SortCondition: 'ASC',
          PageNo: pageNo || 1,
        })

        if (res.data?.Items && res.data.Items.length > 0) {
          // console.log(`✅ ${itemName} 찾은 카테고리코드: ${category.Code}`)
          return res.data // 바로 반환
        }
      } catch (error) {
        // console.warn(`⚠️ ${category.Code} 코드에서 에러 발생`, error)
        continue
      }
    }

    console.error(`❌ ${itemName}에 해당하는 카테고리코드를 찾지 못함`)
    return null
  }

  // ✅ CategoryCode가 이미 있는 경우
  try {
    const res = await instance.post('markets/items', {
      Sort: 'GRADE',
      CategoryCode: CategoryCode,
      ItemName: itemName || '',
      SortCondition: 'ASC',
      PageNo: pageNo || 1,
    })

    // console.log(`✅ ${itemName} 아이템 호출 성공`)
    return res.data
  } catch (error) {
    console.error(`❌ ${itemName} 호출 실패`, error)
    return null
  }
}

export const getItemsByCategory = async (apikey: string, CategoryCode: number, pageNo?: number) => {
  try {
    const instance = createLostarkInstance(apikey)
    const res = await instance.post('markets/items', {
      Sort: 'GRADE',
      CategoryCode: CategoryCode,
      SortCondition: 'ASC',
      PageNo: pageNo || 1,
    })
    // console.log(`✅ ${CategoryCode} 카테고리코드의 아이템 정보`)

    return res.data
  } catch (error) {
    console.error(`❌ ${CategoryCode} 카테고리코드 오류`, error)
  }
}

export const getJewelData = async (apikey: string, Name: string) => {
  try {
    const instance = createLostarkInstance(apikey)
    const res = await instance.post('auctions/items', {
      Sort: 'BUY_PRICE',
      CategoryCode: 210000,
      ItemName: Name,
      SortCondition: 'ASC',
      PageNo: 1,
    })
    // console.log(`✅ ${Name} 정보측`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 정보측 실패`, error)
  }
}

export const getExpeditionData = async (apikey: string, Name: string) => {
  try {
    const instance = createLostarkInstance(apikey)
    const res = await instance.get(`characters/${Name}/siblings`)
    // console.log(`✅ ${Name} 정보 호출`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 호출 실패`, error)
  }
}

export const getCharInfoData = async (apikey: string, Name: string, Filter?: string) => {
  try {
    const instance = createLostarkInstance(apikey)
    const res = await instance.get(`armories/characters/${Name}${Filter ? `/${Filter}` : ''}`)
    // console.log(`✅ ${Name} 정보 호출`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 호출 실패:`, error)
  }
}

export const getCharProfile = async (apikey: string, Name: string) => {
  try {
    const instance = createLostarkInstance(apikey)

    const res = await instance.get(`armories/characters/${Name}/profiles`)

    if (!res.data) {
      throw new Error('프로필 데이터 로딩 실패 (장기 미접속 문제)')
    }
    // console.log(`✅ ${Name} 프로필 호출`)
    return res.data
  } catch (error) {
    console.error(`❌ ${Name} 프로필 호출 실패:`, error)
    throw error
  }
}
