

import { Component } from 'react'

function connect(observable) {

  return function(InnerComponent) {
    class OuterComponent extends Component {
      constructor(props, context) {
        super(props, context)
        this.state = {}
      }

      componentWillUnmount() {
        observable.unsubscribe(this.subscribe)
      }

      componentDidMount() {
        observable.subscribe(this.subscribe)
      }

      subscribe = up => {
        this.setState({...up})
      }

      render() {
        return (
          <InnerComponent {...this.props} {...this.state}  />
        )
      }
    }

    return OuterComponent
  }
}

export default connect
