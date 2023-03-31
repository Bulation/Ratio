export const BOARD_SIZE = 5; // размер игрового поля
export const PROBABILITY = 0.9; // вероятность выпадения двойки
export const MIN_DEFAULT_NUM = 2;
export const MAX_DEFAULT_NUM = 4; // выпадают только числа 2 и 4
export const DEFAULT_FONT_SIZE = 40; // размер шрифта для чисел
export const FONT_COEF = 5; // коэффициент уменьшения размера шрифта при увеличении количества цифр
export const STATE_KEYS = ['bestScore', 'score', 'time', 'board', 'boardsStack', 'scoresStack', 'winValue', 'is2048Reached', 'login']; // массив ключей по которым хранятся значения в локал сторедж
export const COLORS = { // объект, в котором ключи - значения чисел и значения - цвет, который должен соответствовать числовому значению ключа
  '2': 'rgb(230, 230, 250)',
  '4': 'rgb(254, 222, 0)',
  '8': 'rgb(108, 119, 159)',
  '16': 'rgb(239, 60, 64)',
  '32': 'rgb(39, 252, 62)',
  '64': 'rgb(108, 143, 157)',
  '128': 'rgb(222, 118, 49)',
  '256': 'rgb(56, 119, 9)',
  '512': 'rgb(12, 130, 183)',
  '1024': 'rgb(237, 197, 63)',
  '2048': 'rgb(153, 4, 254)',
  '4096': 'rgb(250, 88, 73)'
}
export const WIN_VALUE = 2048; // значение, необходимое для выигрыша
export const ALLOWED_TIME = 50; // минимально разрешенное время для свайпа мышью
export const ALLOWED_DISTANCE = 60; // минимально разрешенная дистанция для свайпа мышью
export const COUNT_PER_PAGE = 10; // количество результатов на одной странице в таблице рекордов
export const BASE_URL = 'https://two048-back.onrender.com/api/v1';