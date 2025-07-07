import { useOtherSelectionStore } from '../../stores/selections/OtherSelectionStore'
import Button from '../ui/Button'

const OtherSelector = ({ SelectedCharacterInfo }: { SelectedCharacterInfo: any }) => {
  const { toggleDrop, characterSelections } = useOtherSelectionStore()
  console.log(characterSelections)

  return (
    <div className='flex w-full flex-col'>
      <Button
        text='테스트'
        onClick={() =>
          toggleDrop(SelectedCharacterInfo.name, '쿠르잔1', '전선', 1640, {
            name: '운명의 파괴석',
            amount: 147,
          })
        }
      />
    </div>
  )
}

export default OtherSelector
