# nodejs 实现博客后台

1.

```javascript
//test
console.log('hello nodejs');
```

2. sql 语句

```sql
use myblog;  --使用这个数据库

show tables;  --显示所有的表

insert into users (username, `password`, realname) values("deng","123","邓");  --插入一条数据

select * from users;  --查询user表所有数据

select id, username from users;  --查询所有数据的两列

select * from users where username="yang" and `password`="123";  --where条件查询

select * from users where username like "%an%";  --模糊查询

select * from users where password like "%1%" order by id desc;  --模糊查询并且排序 desc倒序

SET SQL_SAFE_UPDATES = 0;  --update时报错，执行这个程序

update users set realname="邓x" where username="deng";  --更新一个列表

delete from users where username="deng";  --删除一条数据

insert into users (username, `password`, realname) values("deng","123","邓");  --插入一条数据

select * from users where state='1';  --查询state=1的数据

select * from users where state <> '0';  --查询state！=1的数据

update users set state='0' where username="deng";  --设置deng的state=0，软删除

```
