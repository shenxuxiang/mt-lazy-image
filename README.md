# mt-lazy-image

A light-weight React mt-lazy-image component with extremely easy API（只适用于移动端项目）. [Online Demo](https://shenxuxiang.github.io/mt-lazy-image/), welcome [code review](https://github.com/shenxuxiang/mt-lazy-image)

## Installation
```sh
npm install mt-lazy-image --save
```

## Usage mt-lazy-image
```js
import React, { PureComponent } from 'react';
import './app.less';
import Image from 'mt-lazy-image'
import { data } from './constant';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      source: [],
    }
    this.containRef = React.createRef(null);
  }

  componentDidMount() {
    this.setState({ source: data })
  }

  render() {
    return (
      <div className="container" >
        <ul className="mt-goods-list" ref={this.containRef}>
          {
            this.state.source.map(item =>
              <li className="mt-goods-list-item" key={item.goods_id}>
                <Image
                  src={item.url}
                  alt="商品图片"
                  className="mt-goods-list-item-avator"
                  container={this.containRef.current}
                />
                <div className="mt-goods-list-item-name">{item.name}</div>
                <div className="mt-goods-list-item-price">{(item.price / 100 || 0).toFixed(2)}</div>
                <div className="mt-goods-list-item-button">去抢购</div>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}
```

## props

| param                | detail                                                           | type     | default      |
| -------------------- | ---------------------------------------------------------------- | -------- | ------------ |
| className            | img class name                                                   | string   | ''           |
| src                  | img src                                                          | string   | isRequired   |
| defaultsrc           | img default src                                                  | string   | ''           |
| alt                  | img alt                                                          | string   | ''           |
| container            | Under which DOM node (overflow: auto / scroll)                   | any      | window       |
| propName             | Other HTML attributes that can be set on the img element         | any      |              |


## 注意
使用是需要注意 `container props`。这个props的值是一个设置了 `overflow: auto | scroll` 属性的 `dom` 元素
