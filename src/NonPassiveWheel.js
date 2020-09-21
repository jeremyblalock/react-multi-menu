import React, { Component } from 'react'

export default class NonPassiveWheelElement extends Component {
  static defaultProps = {
    component: 'div',
  }

  componentDidMount() {
    let { onWheel } = this.props

    if (onWheel) {
      this.el.addEventListener('wheel', onWheel, { passive: false })
    }
  }

  componentWillUnmount() {
    let { onWheel } = this.props

    if (this.el && onWheel) {
      this.el.removeEventListener('wheel', onWheel)
    }
  }

  componentDidUpdate(oldProps) {
    let { onWheel: oldCallback } = oldProps
    let { onWheel: newCallback } = this.props

    if (oldCallback === newCallback) return

    if (oldCallback) {
      this.el.removeEventListener('wheel', oldCallback)
    }

    if (newCallback) {
      this.el.addEventListener('wheel', newCallback, { passive: false })
    }
  }

  ref = el => {
    this.el = el
  }

  render() {
    let { component: ComponentClass, onWheel, ...props } = this.props
    console.log('CLASS:', ComponentClass)

    return <ComponentClass {...props} ref={this.ref} />
  }
}
