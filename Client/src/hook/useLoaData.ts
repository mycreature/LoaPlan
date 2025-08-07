// src/hook/useInitCharacterData.ts
import { useEffect } from 'react'
import useAccountStore from '../stores/others/AccountStore'
import { useCharacterStore } from '../stores/api/CharacterStore'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'
import { useMarketStore } from '../stores/api/MarketStore'

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

  // 아이템 시세 정보 받아오기
  const loadRefineItemInfo = useMarketStore((state) => state.loadRefineItemInfos)

  // 첫 로드 시 게스트 로그인 여부 확인
  // 게스트 로그인 정보가 있을시 localStorage 초기화
  useEffect(() => {
    const isGuest = sessionStorage.getItem('guest-token')

    if (isGuest == null) {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [])

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

  useEffect(() => {
    loadRefineItemInfo()
  }, [loadRefineItemInfo])
}

export default useLoaData
