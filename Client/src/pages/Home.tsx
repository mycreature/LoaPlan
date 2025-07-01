// pages/Home.tsx
import { useEffect } from 'react'
import useAccountStore from '../stores/others/AccountStore'
import { useCharacterStore } from '../stores/api/CharacterStore'
import useViewportType from '../hook/useViewportType'
import HomeMobileLayout from '../layouts/HomeMobileLayout'
import HomeDesktopLayout from '../layouts/HomeDesktopLayout'
import HomeTabletLayout from '../layouts/HomeTabletLayout'
import { useRequireUserOrGuest } from '../hook/useAuthRedirect'
import { useExpeditionStore } from '../stores/api/ExpeditionStore'

const Home = () => {
  const isViewport = useViewportType()

  const loadProfileData = useCharacterStore((state) => state.loadProfileData)
  const loadCharInfoData = useCharacterStore((state) => state.loadCharInfoData)
  const loadExpeditionData = useExpeditionStore((state) => state.loadExpeditionData)
  const characterName = useAccountStore((state) => state.character)

  useRequireUserOrGuest('/login')

  useEffect(() => {
    if (characterName) {
      loadProfileData(characterName)
      loadCharInfoData(characterName)
      loadExpeditionData(characterName)
    }
  }, [characterName, loadProfileData, loadCharInfoData, loadExpeditionData])

  return (
    <div className='min-h-screen bg-gray-600 pt-[50px]'>
      {isViewport === 'desktop' ? (
        <HomeDesktopLayout />
      ) : isViewport === 'tablet' ? (
        <HomeTabletLayout />
      ) : (
        <HomeMobileLayout />
      )}
    </div>
  )
}

export default Home
