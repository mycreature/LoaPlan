import { guestOtherSelection, guestRaidSelection } from './../constants/guestStorage'
import { useEffect } from 'react'
import useAccountStore from '../stores/others/AccountStore'
import { useCharacterStore } from '../stores/api/CharacterStore'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'
import { useCharacterSelectionStore } from '../stores/selections/CharacterSelectionStore'
import { useMarketStore } from '../stores/api/MarketStore'
import { getAuthStatus } from './useAuthRedirect'
import getJwtInfo from '../utils/jwtInfo'
import { useRaidSelectionStore } from '../stores/selections/RaidSelectionStore'
import { useOtherSelectionStore } from '../stores/selections/OtherSelectionStore'

const useLoaData = () => {
  // 기본적인 LostArk API 정보 받아오기
  const loadProfileData = useCharacterStore((state) => state.loadProfileData)
  const loadCharInfoData = useCharacterStore((state) => state.loadCharInfoData)
  const loadExpeditionData = useExpeditionStore((state) => state.loadExpeditionData)
  const characterName = useAccountStore((state) => state.character)

  // 게스트 로그인 정보 받아오기
  const loadRaidSelectionState = useRaidSelectionStore((state) => state.loadSelectionState)
  const loadOtherSelectionState = useOtherSelectionStore((state) => state.loadSelectionState)

  const guestRaidInfo = guestRaidSelection.state.characterSelections
  const gusstOtherInfo = guestOtherSelection.state.characterSelections

  // 사용자가 선택한 캐릭터 (계정 내 값이 아닌 UI에서 선택한 값) 정보 받아오기
  const selectedCharacter = useCharacterSelectionStore((state) => state.selectedCharacterName)
  const loadSelectedProfileData = useCharacterSelectionStore(
    (state) => state.loadSelectedProfileData,
  )

  // 아이템 시세 정보 받아오기
  const loadRefineItemInfo = useMarketStore((state) => state.loadRefineItemInfos)

  const { isGuest, isLogin } = getAuthStatus()

  // 첫 로드 시 게스트 로그인 여부 확인
  // 게스트 로그인 정보가 있을시 localStorage 초기화
  useEffect(() => {
    if (!isGuest && !isLogin) {
      localStorage.clear()
      sessionStorage.clear()
    }
  }, [isGuest, isLogin])

  useEffect(() => {
    if (characterName) {
      loadProfileData(characterName)
      loadCharInfoData(characterName)
      loadExpeditionData(characterName)
    }
  }, [characterName, isGuest, isLogin])

  useEffect(() => {
    if (isGuest) {
      loadRaidSelectionState(guestRaidInfo)
      loadOtherSelectionState(gusstOtherInfo)
    }
  }, [isGuest])

  useEffect(() => {
    if (selectedCharacter) {
      loadSelectedProfileData(selectedCharacter)
    }
  }, [selectedCharacter])

  useEffect(() => {
    loadRefineItemInfo()
  }, [isGuest, isLogin])

  useEffect(() => {
    getJwtInfo()
  }, [isGuest, isLogin])
}

export default useLoaData
