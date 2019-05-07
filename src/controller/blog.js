const getList = (author, keyword) => {
  //先返回假数据（格式是正确的）
  return [
    {
      id: 1,
      title: '标题A',
      content: '内容A',
      createTime: 1557207375061,
      author: 'yang'
    },
    {
      id: 1,
      title: '标题B',
      content: '内容B',
      createTime: 1557207440860,
      author: 'deng'
    }
  ];
};

const getDetail = id => {
  return {
    id: 1,
    title: '标题A',
    content: '内容A',
    createTime: 1557207375061,
    author: 'yang'
  };
};

module.exports = {
  getList,
  getDetail
};
