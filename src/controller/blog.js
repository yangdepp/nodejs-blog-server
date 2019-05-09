const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;
  //先返回假数据（格式是正确的）
  return exec(sql);
};

const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含 title content, author属性
  const { title, content, author } = blogData;
  const createtime = Date.now();

  const sql = `
    insert into blogs (title, content, author, createtime)
    values ('${title}', '${content}', '${author}', '${createtime}')
  `;
  return exec(sql).then(insertData => {
    // console.log('insertData', insertData);
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象，包含 title content属性
  // id是要更新博客的id

  const { title, content } = blogData;
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `;
  return exec(sql).then(updateData => {
    // console.log('updateData', updateData);
    return updateData.affectedRows > 0;
  });
};

const delBlog = (id, author) => {
  // id是要删除博客的id
  const sql = `
    delete from blogs where id='${id}' and author='${author}'
  `;
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0;
  });
};
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
