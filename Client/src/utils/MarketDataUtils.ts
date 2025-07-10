// 입력받은 Drop 내 아이템 명칭 및 갯수를 itemInfos의 아이템 시세에 맞춰 골드값을 계산하는 함수
export const calculateGoldByDrops = (drops: { name: string; amount: number }[], itemInfos: any) => {
  let totalGold = drops.reduce((acc, drop) => {
    const item = itemInfos[drop.name]
    const price = item?.RecentPrice / item?.BundleCount || 0
    return acc + price * drop.amount
  }, 0)

  return Number(totalGold.toFixed())
}
