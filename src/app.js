import React, { PureComponent } from 'react';
import './app.less';
import Image from './lazy-image'
import { data } from './constant';

export default class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      source: [],
    }
    this.containRef1 = React.createRef(null);
    this.containRef2 = React.createRef(null);
  }

  componentDidMount() {
    this.setState({ source: data })
  }

  render() {
    return (
      <div className="container" >
        <ul className="mt-goods-list-1" ref={this.containRef1}>
          {
            this.state.source.map(item =>
              <li className="mt-goods-list-item" key={item.goods_id}>
                <Image
                  src={item.url}
                  alt="商品图片"
                  className="mt-goods-list-item-avator"
                  container={this.containRef1.current}
                />
                <div className="mt-goods-list-item-name">{item.name}</div>
                <div className="mt-goods-list-item-price">{(item.price / 100 || 0).toFixed(2)}</div>
                <div className="mt-goods-list-item-button">去抢购</div>
              </li>
            )
          }
        </ul>

        <ul className="mt-goods-list-2" ref={this.containRef2}>
          {
            this.state.source.map(item =>
              <li className="mt-goods-list-item" key={item.goods_id}>
                <Image
                  src={item.url}
                  alt="商品图片"
                  className="mt-goods-list-item-avator"
                  container={this.containRef2.current}
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
