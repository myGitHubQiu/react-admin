import React, { Component } from "react";

import Analysis from "./Analysis";
// import Monitor from "./Monitor";
// import Search from "./Search";
// import Statistics from "./Statistics";

// 引入Scales
import Scales from './Scales/index'
// 引入Search
import Search from './Search'
// 
import Static from './Static'

export default class Admin extends Component {
  render () {
    return (
      <div>
        <Analysis />
        <Scales />
        <Search />
        <Static />

        {/* <Monitor />
        <Search />
        <Statistics /> */}
      </div>
    );
  }
}
