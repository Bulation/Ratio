import { YANDEX_METRICA_ID } from '@/constants'

type TargetName = 'location' | 'checkIn' | 'checkOut' | 'guest' | 'orderError'

function isTargetName(value: string): value is TargetName {
  return ['location', 'checkIn', 'checkOut', 'guest', 'orderError'].includes(value)
}

const yandexMetrica = {
  setGoal(targetName: string) {
    if (!isTargetName(targetName)) {
      return
    }
    window['ym' as keyof typeof window](YANDEX_METRICA_ID, 'reachGoal', targetName)
  },
  redirectToPage(url: string) {
    window['ym' as keyof typeof window](YANDEX_METRICA_ID, 'hit', url)
  }
}

export default yandexMetrica
