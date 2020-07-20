import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip, Divider, Skeleton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

import "./index.less";

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.object.isRequired,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    loading: false,
  };

  render () {
    const { title, footer, children, loading } = this.props;

    return (
      <div className="card">
        <Skeleton
          // loading控制Skeleton（骨架）是显示还是隐藏
          loading={loading}
          // 给骨架一个闪烁效果
          active
          // 骨架长度
          title={{ width: "100%" }}
          // 定义骨架内容 有几条 占多少
          paragraph={{ rows: 3, width: "100%" }}
        >
          <div className="card-header">
            {title}
            <Tooltip title="指标说明">
              <QuestionCircleOutlined className="card-icon" />
            </Tooltip>
          </div>
          <div className="card-content">{children}</div>
          {footer && (
            <>
              <Divider style={{ margin: "10px 0" }} />
              <div className="card-footer">{footer}</div>
            </>
          )}
        </Skeleton>
      </div>
    );
  }
}
