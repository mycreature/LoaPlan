// src/hook/useInitCharacterData.ts
import { useEffect } from 'react'
import useAccountStore from '../stores/others/AccountStore'
import { useCharacterStore } from '../stores/api/CharacterStore'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'

const useLoaData = () => {
  const loadProfileData = useCharacterStore((state) => state.loadProfileData)
  const loadCharInfoData = useCharacterStore((state) => state.loadCharInfoData)
  const loadExpeditionData = useExpeditionStore((state) => state.loadExpeditionData)
  const characterName = useAccountStore((state) => state.character)

  useEffect(() => {
    if (characterName) {
      loadProfileData(characterName)
      loadCharInfoData(characterName)
      loadExpeditionData(characterName)
    }
  }, [characterName, loadProfileData, loadCharInfoData, loadExpeditionData])
}

export default useLoaData
