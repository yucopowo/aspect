import * as React from 'react';
// import Page from './Page';
// import PageBeforeAdvice from './PageBeforeAdvice';
import PageAroundAdvice from './PageAroundAdvice';

interface State {
  list: number[];
}

export default class Application extends React.Component<{}, State> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      list: [1, 2, 3, 4],
    };
  }
  render() {
    return (
      <div>
        {/* <Page list={this.state.list} /> */}
        {/* <hr /> */}
        {/* <PageBeforeAdvice list={this.state.list} /> */}
        {/* <hr /> */}
        <PageAroundAdvice list={this.state.list} />
      </div>
    );
  }
}
