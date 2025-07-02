import { useExpeditionGoldData } from '../../hook/useExpeditionGoldData'
import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import { useRaidSelectionStore } from '../../stores/selections/RaidSelectionStore'

import Button from '../ui/Button'

const RaidSelector = () => {
  const { toggleGate } = useRaidSelectionStore()
  const { toggleDrop } = useOtherSelectionStore()

  const expeditionGoldData = useExpeditionGoldData() || []

  if (expeditionGoldData.length === 0) return null

  console.log(expeditionGoldData)

  return (
    <div>
      <Button onClick={() => toggleGate(expeditionGoldData[0].name, '카멘', '노말', 1)}></Button>
    </div>
  )
}

export default RaidSelector
