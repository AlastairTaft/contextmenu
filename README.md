
# A dead simple React context menu

A low level React context menu implementation with a simple api.

## Table of contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [API](#api)
 - [License](#license)

## Installation

```
yarn add @alastar/contextmenu
```

## Usage

Design your context menu however you like and attach it by creating a context menu ref to a target element.

```
import createContextMenuRef from '@alastair/contextmenu'

const MyWidget = props => {
  var ContextMenu = ({ onClose }) => <div>
    This is my context menu.
    <button onClick={onClose}>Logout</button>
  </div>

  return <div ref={createContextMenuRef(ContextMenu)}>
    Click here to open the context menu.
  </div>
}
```

## API

The api exports the following function

- createContextMenuRef

### `createContextMenuRef(ContextMenu, opt_ref)`
Create a context menu ref.

#### PropTypes

| Property     | Type               | Required? | Description                                                      |
|--------------|--------------------|-----------|------------------------------------------------------------------|
| ContextMenu  | Component/Function | ✓         | The context menu as a component or function.                     |
| opt_ref      | Object/Function    |           | The regular ref argument, can use React.createRef or a function. |

## License

MIT