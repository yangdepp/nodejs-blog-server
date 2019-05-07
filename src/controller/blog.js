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

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content属性
  return {
    id: 3 //新建博客插入到数据库里的id
  };
};

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含 title content属性
  // id是要更新博客的id

  console.log('update blog', id, blogData);
  return true;
};

const delBlog = id => {
  // id是要删除博客的id
  return true;
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
