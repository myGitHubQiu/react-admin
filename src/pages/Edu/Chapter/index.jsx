import React, { Component } from "react";
import { Button, message, Tooltip, Modal, Alert, Table } from "antd";
import {
  FullscreenOutlined,
  RedoOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";

//导入知乎的griffith视频组件
import Player from 'griffith'

//2. 导入全屏组件
import screenfull from 'screenfull'

import { connect } from "react-redux";
import SearchForm from "./SearchForm";

// 引入获取课程列表数据的异步action->getLessonList
import { getLessonList, batchDelChapter, batchDelLesson } from './redux/actions'

import "./index.less";

dayjs.extend(relativeTime);

@connect(
  (state) => ({
    // courseList: state.courseList
    // permissionValueList: filterPermissions(
    //   state.course.permissionValueList,
    //   "Course"
    // )
    chapterList: state.chapterList
  }),
  // connect 二次封装getLessonList 得到容器组件
  { getLessonList, batchDelChapter, batchDelLesson }
  // { getcourseList }
)
class Chapter extends Component {
  state = {
    searchLoading: false,
    previewVisible: false,
    previewImage: "",
    selectedRowKeys: [],
    video: ''
  };

  showModal = video => () => {
    // 处理
    this.setState({
      previewVisible: true,
      video: video
      // previewImage: img,
    });
  };

  handleImgModal = () => {
    this.setState({
      previewVisible: false,
    });
  };

  componentDidMount () {
    // const { page, limit } = this.state;
    // this.handleTableChange(page, limit);
  }

  handleTableChange = (page, limit) => {
    this.setState({
      tableLoading: true,
    });

    this.getcourseList({ page, limit }).finally(() => {
      this.setState({
        tableLoading: false,
        page,
        limit,
      });
    });
  };

  getcourseList = ({ page, limit, Coursename, nickName }) => {
    return this.props
      .getcourseList({ page, limit, Coursename, nickName })
      .then((total) => {
        if (total === 0) {
          message.warning("暂无用户列表数据");
          return;
        }
        message.success("获取用户列表数据成功");
      });
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  // 定义展开章节按钮的事件处理函数
  handleClickExpand = (expand, record) => {
    // console.log(expand,record)  true为展开 false为不展开
    if (expand) {
      // 发送请求 获取数据
      this.props.getLessonList(record._id)
    }
  }

  // 点击新增课时的跳转
  handleToAddLesson = data => () => {
    this.props.history.push('/edu/chapter/addlesson', data)
  }

  // 点击批量删除按钮的事件处理函数
  handleBatchDel = () => {
    // 友情提示
    Modal.confirm({
      title: '确定要批量删除吗?',
      onOk: async () => {
        // console.log('yes')
        // selectedRowKeys里面存储的是所有的选中的课时和章节
        // 在删除之前要先分清哪些是课时的id 哪些是章节的id
        // 存储章节id
        let chapterIds = []
        // 存储课时id
        let lessonIds = []

        // 拿到所有选中的id
        let selectedRowKeys = this.state.selectedRowKeys
        // 所有章节数据都存储在redux里面
        // 获取所有章节数据
        let chapterList = this.props.chapterList.items
        // 遍历章节所有数据chapterList 拿到每个章节id
        chapterList.forEach(chapter => {
          // 找到每一条章节的id
          let chapterId = chapter._id
          // 拿到章节id到selectedRowKeys中找
          // 如果selectedRowKeys中有chapterId 就返回这个id对应的下标 没有就返回-1
          let index = selectedRowKeys.indexOf(chapterId)
          // 判断index值
          if (index > -1) {
            // 来到这里 证明找到了
            // 找到后就从selectedRowKeys中把这条数据切割出来
            // splice会修改原来的数组，并返回切割后的新的数组
            let newArr = selectedRowKeys.splice(index, 1)
            // 把切割后的每条章节id一条一条push到新的数组中
            chapterIds.push(newArr[0])
          }
        })
        // console.log(chapterIds)
        // console.log(selectedRowKeys)
        // 循环后的selectedRowKeys就是剩下的课时id
        lessonIds = [...selectedRowKeys]

        // 调用api方法  批量删除章节数据
        await this.props.batchDelChapter(chapterIds)
        await this.props.batchDelLesson(lessonIds)
        // 成功后的提示信息 应该是在上面那两个删除方法成功后才调用
        // 所以要写成异步方法
        message.success('删除章节-课时数据成功')
      }
    })
  }

  // 全屏功能
  handleScreenFull = () => {
    // screenfull.request()// 整个页面全屏 只能打开全屏, 按esc键退出全屏
    screenfull.toggle() // 点击全屏按钮,可以展开也可以关闭
  }

  render () {
    const { previewVisible, previewImage, selectedRowKeys } = this.state;

    const columns = [
      {
        title: "章节名称",
        dataIndex: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        render: (isFree) => {
          return isFree === true ? "是" : isFree === false ? "否" : "";
        },
      },

      // 增加预览按钮
      {
        title: "视频",
        render: (value) => {
          // 如果value中有free 说明是课时 取反说明没有free就是课程
          // 课程不需要展示视频按钮 所以返回
          if (!value.free) return
          // 能来到这里说明是课时 就把预览按钮给展示出来
          return <Button onClick={this.showModal(value.video)}>预览</Button>
        },
      },
      {
        title: "操作",
        width: 300,
        fixed: "right",
        render: (data) => {
          // if ("free" in data) {
          return (
            <div>
              {/* 如果data中的free全等undefined 说明没有free属性 是课程不展示这个按钮  */}
              {data.free === undefined && <Tooltip title="新增课时">
                <Button type="primary" style={{ marginRight: '10px' }} onClick={this.handleToAddLesson(data)}>
                  <PlusOutlined />
                </Button>
              </Tooltip>}
              <Tooltip title={data.free === undefined ? "更新章节" : "更新课时"}>
                <Button type="primary" style={{ marginRight: '10px' }}>
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title={data.free === undefined ? "删除章节" : "删除课时"}>
                <Button type="danger">
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          );
          // }
        },
      },
    ];

    const data = [
      {
        id: "111",
        title: "第一章节",
        children: [
          {
            id: "1",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "2",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "3",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
      {
        id: "222",
        title: "第二章节",
        children: [
          {
            id: "4",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "5",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "6",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
      {
        id: "333",
        title: "第三章节",
        children: [
          {
            id: "1192252824606289921",
            title: "第一课时",
            free: false,
            videoSourceId: "756cf06db9cb4f30be85a9758b19c645",
          },
          {
            id: "1192628092797730818",
            title: "第二课时",
            free: true,
            videoSourceId: "2a02d726622f4c7089d44cb993c531e1",
          },
          {
            id: "1192632495013380097",
            title: "第三课时",
            free: true,
            videoSourceId: "4e560c892fdf4fa2b42e0671aa42fa9d",
          },
        ],
      },
    ];

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      //#region
      // hideDefaultSelections: true,
      // selections: [
      //   Table.SELECTION_ALL,
      //   Table.SELECTION_INVERT,
      //   {
      //     key: "odd",
      //     text: "Select Odd Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return false;
      //         }
      //         return true;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   },
      //   {
      //     key: "even",
      //     text: "Select Even Row",
      //     onSelect: changableRowKeys => {
      //       let newSelectedRowKeys = [];
      //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
      //         if (index % 2 !== 0) {
      //           return true;
      //         }
      //         return false;
      //       });
      //       this.setState({ selectedRowKeys: newSelectedRowKeys });
      //     }
      //   }
      // ]
      //#/region
    };

    // 视频预览 定义视频资源
    const sources = {
      hd: {
        play_url: this.state.video,
        bitrate: 1,
        duration: 1000,
        format: '',
        height: 500,
        size: 160000,
        width: 500
      }
    }

    return (
      <div>
        <div className="course-search">
          <SearchForm />
        </div>
        <div className="course-table">
          <div className="course-table-header">
            <h3>课程章节列表</h3>
            <div>
              <Button type="primary" style={{ marginRight: 10 }}>
                <PlusOutlined />
                <span>新增</span>
              </Button>
              <Button
                type="danger"
                style={{ marginRight: 10 }}
                onClick={this.handleBatchDel}
              >
                <span>批量删除</span>
              </Button>
              <Tooltip
                title="全屏"
                className="course-table-btn"
                onClick={this.handleScreenFull}
              >
                <FullscreenOutlined />
              </Tooltip>
              <Tooltip title="刷新" className="course-table-btn">
                <RedoOutlined />
              </Tooltip>
              <Tooltip title="设置" className="course-table-btn">
                <SettingOutlined />
              </Tooltip>
            </div>
          </div>
          <Alert
            message={
              <span>
                <InfoCircleOutlined
                  style={{ marginRight: 10, color: "#1890ff" }}
                />
                {`已选择 ${selectedRowKeys.length} 项`}
              </span>
            }
            type="info"
            style={{ marginBottom: 20 }}
          />
          <Table
            rowSelection={rowSelection}
            columns={columns}
            // 动态获取数据
            dataSource={this.props.chapterList.items}
            rowKey="_id"
            expandable={{
              onExpand: this.handleClickExpand
            }}
          />
        </div>
        {/* antd中对话组件 预览功能就是在这里使用 */}
        <Modal
          title="视频"
          visible={previewVisible}
          // footer={null}
          onCancel={this.handleImgModal}
          // Modal组件有一个destroyOnClose属性(关闭modal时销毁里面的子组件)
          destroyOnClose={true}
        >
          {/* <img alt="example" style={{ width: "100%" }} src={previewImage} /> */}
          <Player
            sources={sources}
            id={'1'}
            cover={'http://localhost:3000/logo512.png'}
            duration={1000}
          >
          </Player>
        </Modal>
      </div>
    );
  }
}

export default Chapter;
