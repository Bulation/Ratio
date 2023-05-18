import type { Directive } from 'vue'
// директива для обработки кликов по бэкдропам
const clickOutsideDirective: Directive = {
  mounted(element, { value }) {
    element.clickOutside = function (e: Event) {
      if (e.target instanceof HTMLElement && !element.contains(e.target) && element !== e.target) {
        value()
      }
    }
    document.body.addEventListener('click', element.clickOutside)
  },
  unmounted(element) {
    document.body.removeEventListener('click', element.clickOutside)
  }
}

export default clickOutsideDirective
