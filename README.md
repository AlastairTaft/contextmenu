
# A dead simple React context menu

A low level React context menu implementation with a simple api that has no
dependencies (although expects React).

## Table of contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [API](#api)
 - [License](#license)

## Installation

```
yarn add @alastair/contextmenu
```

## Usage

Design your context menu however you like and attach it by creating a context menu ref to a target element.

```jsx
import createContextMenuRef from '@alastair/contextmenu'

const MyWidget = props => {
  const ContextMenu = ({ onClose }) => <div>
    This is my context menu.
    <button onClick={onClose}>Close</button>
  </div>

  return <div ref={createContextMenuRef(ContextMenu)}>
    Click here to open the context menu.
  </div>
}
```

## API

The api exports the following function

### `createContextMenuRef(ContextMenu, opt_ref)`
Create a context menu ref, this sets the target element that when clicked will
open the context menu.

#### Arguments

| Argument     | Type               | Required? | Description                                                                                                                                                 |
|--------------|--------------------|-----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ContextMenu  | Component/Function | ✓         | The context menu. This will be shown when the target ref is clicked. It will have one injected prop `onClose` which you can fire to close the context menu. |
| opt_ref      | Object/Function    |           | The regular ref argument, this is useful if you need to use the standard ref behaviour                                                                      |

## License

MIT