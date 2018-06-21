import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Create a context menu ref
 * @param {React.Component|Function} ContextMenu A React component or Function
 * @param {object|Function} opt_ref A ref object or ref function, use this if you
 * still need to use the default ref behaviour
 * @returns {Function}
 */
function createContextMenuRef(ContextMenu, opt_ref) {

  // Setup a div for containing our context menu when its mounted
  var container = document.createElement('div')
  container.style.position = 'absolute'

  /**
   * Close the context menu
   */
  function onClose() {
    // If it hasn't already been removed
    if (!container.parentNode) return
    document.body.removeChild(container)
    ReactDOM.unmountComponentAtNode(container)
    document.body.removeEventListener('mousedown', onHideContextMenu)
  }

  /**
   * Handles a mouse or touch event to determine where to and show the context
   * menu.
   * @param {Event} e
   */
  function onShowContextMenu(e) {
    container.style.left = e.pageX + 'px'
    container.style.top = e.pageY + 'px'
    document.body.appendChild(container)
    // We don't mount ahead of time so that the user can still use lifecycle
    // methods
    ReactDOM.render(React.createElement(ContextMenu, {
      onClose
    }), container)
    e.stopPropagation()
    document.body.addEventListener('mousedown', onHideContextMenu)
  }

  /**
   * Handles the mousedown event to potentially hide the context menu if the
   * mousedown was outside of the context menu container.
   * @param {Event} e
   */
  function onHideContextMenu(e) {
    if (isInsideContainer(e.target, container)) return
    onClose()
  }

  /**
   * Is a target element inside or a container element
   * @param {Element} target
   * @param {Element} container
   * @returns {boolean}
   */
  function isInsideContainer(target, container) {
    while (target != document.body) {
      if (target == container) return true
      target = target.parentNode
    }
    return false
  }

  var targetEl

  /**
   * The ref handler function
   * @param {Element} el
   */
  return function (el) {
    if (el) {
      // Attach the context menu
      targetEl = el
      el.addEventListener('mousedown', onShowContextMenu)
    } else {
      // detach context menu
      targetEl.removeEventListener('mousedown', onShowContextMenu)
      onClose()
    }
    // Handle original ref so the user can still use the original ref
    // flow/behaviour
    if (!opt_ref)
      return
    else if (typeof opt_ref === 'function')
      opt_ref(el)
    else if (typeof opt_ref == 'object')
      opt_ref.current = el
    else
      throw new Error(`Only a ref of type object or function is supported with
        'createContextMenuRef()'.`.replace(/\s+/g, ' '))

  }

}

export default createContextMenuRef