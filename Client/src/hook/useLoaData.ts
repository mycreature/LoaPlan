// src/hook/useInitCharacterData.ts
import { useEffect } from 'react'
import useAccountStore from '../stores/others/AccountStore'
import { useCharacterStore } from '../stores/api/CharacterStore'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'

const useLoaData = () => {
  // 기본적인 LostArk API 정보 받아오기
  const loadProfileData = useCharacterStore((state) => state.loadProfileData)
  const loadCharInfoData = useCharacterStore((state) => state.loadCharInfoData)
  const loadExpeditionData = useExpeditionStore((state) => state.loadExpeditionData)
  const characterName = useAccountStore((state) => state.character)

  // 사용자가 선택한 캐릭터 (계정 내 값이 아닌 UI에서 선택한 값) 정보 받아오기
  const selectedCharacter = useCharacterSelectionStore((state) => state.selectedCharacterName)
  const loadSelectedProfileData = useCharacterSelectionStore(
    (state) => state.loadSelectedProfileData,
  )

  useEffect(() => {
    if (characterName) {
      loadProfileData(characterName)
      loadCharInfoData(characterName)
      loadExpeditionData(characterName)
    }
  }, [characterName, loadProfileData, loadCharInfoData, loadExpeditionData])

  useEffect(() => {
    if (selectedCharacter) {
      loadSelectedProfileData(selectedCharacter)
    }
  }, [selectedCharacter])
}

export default useLoaData
