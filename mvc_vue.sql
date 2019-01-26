-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2019-01-26 19:20:09
-- 服务器版本： 10.3.12-MariaDB
-- PHP 版本： 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `mvc_vue`
--

-- --------------------------------------------------------

--
-- 表的结构 `sys_admin`
--

CREATE TABLE `sys_admin` (
  `id` tinyint(3) UNSIGNED NOT NULL COMMENT 'ID',
  `code` varchar(18) CHARACTER SET utf8mb4 NOT NULL COMMENT '编码',
  `uname` varchar(16) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `email` varchar(32) DEFAULT '' COMMENT '邮箱',
  `tel` varchar(11) DEFAULT '' COMMENT '电话',
  `name` varchar(12) DEFAULT '' COMMENT '姓名',
  `department` varchar(12) DEFAULT '' COMMENT '部门',
  `position` varchar(12) DEFAULT '' COMMENT '职称',
  `rtime` datetime DEFAULT NULL COMMENT '注册时间',
  `state` enum('1','2') NOT NULL DEFAULT '1' COMMENT '状态(1正常,2禁用)',
  `perm` text DEFAULT NULL COMMENT '权限'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sys_admin`
--

INSERT INTO `sys_admin` (`id`, `code`, `uname`, `password`, `email`, `tel`, `name`, `department`, `position`, `rtime`, `state`, `perm`) VALUES
(1, '201812130958240001', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'klingsoul@163.com', '15087738003', '管理员', '技术部', '终极管理员', '2018-12-15 00:00:00', '1', '1:0 2:0 3:0 4:0 5:1 6:31 7:31 8:31');

-- --------------------------------------------------------

--
-- 表的结构 `sys_menus`
--

CREATE TABLE `sys_menus` (
  `id` tinyint(3) UNSIGNED NOT NULL COMMENT 'ID',
  `fid` tinyint(3) UNSIGNED NOT NULL COMMENT '父ID',
  `title` varchar(12) NOT NULL COMMENT '标题',
  `url` varchar(32) DEFAULT '' COMMENT '地址',
  `perm` int(6) UNSIGNED DEFAULT 0 COMMENT '预设权限',
  `ico` varchar(32) DEFAULT '' COMMENT '图标',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `sort` tinyint(3) UNSIGNED DEFAULT 0 COMMENT '排序',
  `remark` varchar(32) DEFAULT '' COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sys_menus`
--

INSERT INTO `sys_menus` (`id`, `fid`, `title`, `url`, `perm`, `ico`, `ctime`, `sort`, `remark`) VALUES
(1, 0, '首页', '', 0, 'fa fa-home fa-lg', '2018-12-15 00:00:00', 0, ''),
(2, 0, '系统', '', 0, 'fa fa-cog fa-lg', '2018-12-15 00:00:00', 0, ''),
(3, 1, '桌面', '', 0, '', '2018-12-15 00:00:00', 0, ''),
(4, 2, '系统管理', '', 0, '', '2018-12-15 00:00:00', 0, ''),
(5, 3, '控制台', '/', 1, 'fa fa-th-large fa-1x', '2018-12-15 00:00:00', 0, ''),
(6, 4, '菜单管理', 'SysMenus', 31, 'fa fa-file-text fa-1x', '2018-12-15 00:00:00', 0, ''),
(7, 4, '菜单动作', 'SysMenusAction', 31, 'fa fa-pencil fa-1x', '2018-12-15 00:00:00', 0, ''),
(8, 4, '系统用户', 'SysAdmins', 63, 'fa fa-users fa-1x', '2018-12-15 00:00:00', 0, ''),
(9, 2, '日志管理', '', 0, '', '2018-12-15 00:00:00', 0, '');

-- --------------------------------------------------------

--
-- 表的结构 `sys_menus_action`
--

CREATE TABLE `sys_menus_action` (
  `id` tinyint(3) UNSIGNED NOT NULL COMMENT 'ID',
  `name` varchar(16) NOT NULL COMMENT '名称',
  `action` varchar(16) NOT NULL COMMENT '动作',
  `perm` enum('1','2','4','8','16','32','64','128','256','512','1024','2048') NOT NULL COMMENT '权限值',
  `ico` varchar(32) DEFAULT NULL COMMENT '图标样式'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `sys_menus_action`
--

INSERT INTO `sys_menus_action` (`id`, `name`, `action`, `perm`, `ico`) VALUES
(1, '列表', 'list', '1', 'el-icon-refresh'),
(2, '搜索', 'sea', '2', 'el-icon-search'),
(3, '添加', 'add', '4', 'el-icon-plus'),
(4, '编辑', 'edit', '8', 'el-icon-edit'),
(5, '删除', 'del', '16', 'el-icon-delete'),
(6, '打印', 'print', '32', 'el-icon-printer'),
(7, '导出', 'exp', '64', 'el-icon-d-arrow-right'),
(8, '导入', 'imp', '128', 'el-icon-d-arrow-left'),
(9, '图表', 'chart', '256', 'el-icon-picture');

-- --------------------------------------------------------

--
-- 表的结构 `web_user`
--

CREATE TABLE `web_user` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `user_id` varchar(18) NOT NULL COMMENT '编码',
  `uname` varchar(16) NOT NULL COMMENT '用户名',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `tel` varchar(11) NOT NULL DEFAULT '' COMMENT '手机',
  `email` varchar(32) NOT NULL DEFAULT '' COMMENT '邮箱',
  `state` enum('0','1') NOT NULL DEFAULT '1' COMMENT '状态(0禁用,1正常)',
  `ctime` datetime DEFAULT NULL COMMENT '创建时间',
  `name` varchar(12) NOT NULL DEFAULT '' COMMENT '姓名',
  `sex` enum('','男','女') NOT NULL DEFAULT '' COMMENT '性别',
  `birthday` date DEFAULT NULL COMMENT '生日',
  `nickname` varchar(6) NOT NULL DEFAULT '' COMMENT '昵称',
  `img` varchar(128) NOT NULL DEFAULT '' COMMENT '头像'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `web_video`
--

CREATE TABLE `web_video` (
  `id` int(10) UNSIGNED NOT NULL COMMENT 'ID',
  `user_id` varchar(18) NOT NULL COMMENT '用户ID',
  `type` enum('0','1','2') NOT NULL DEFAULT '0' COMMENT '类型(1视频,2录音,3照片)',
  `title` varchar(30) NOT NULL COMMENT '标题',
  `name` varchar(12) NOT NULL COMMENT '姓名',
  `sex` enum('','男','女') NOT NULL DEFAULT '' COMMENT '性别',
  `tel` varchar(11) NOT NULL DEFAULT '' COMMENT '手机',
  `birthday` int(10) UNSIGNED DEFAULT NULL COMMENT '生日',
  `education` enum('','博士','硕士','本科','大专','高中','初中','其他') NOT NULL DEFAULT '' COMMENT '学历',
  `ctime` int(10) DEFAULT NULL COMMENT '创建时间',
  `img` text NOT NULL DEFAULT '' COMMENT '封面图',
  `upload` varchar(128) NOT NULL DEFAULT '' COMMENT '上传文件',
  `addr` varchar(128) NOT NULL DEFAULT '' COMMENT '地址',
  `remark` varchar(320) NOT NULL DEFAULT '' COMMENT '备注'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转储表的索引
--

--
-- 表的索引 `sys_admin`
--
ALTER TABLE `sys_admin`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_menus`
--
ALTER TABLE `sys_menus`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `sys_menus_action`
--
ALTER TABLE `sys_menus_action`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `web_user`
--
ALTER TABLE `web_user`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `web_video`
--
ALTER TABLE `web_video`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `sys_admin`
--
ALTER TABLE `sys_admin`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=2;

--
-- 使用表AUTO_INCREMENT `sys_menus`
--
ALTER TABLE `sys_menus`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `sys_menus_action`
--
ALTER TABLE `sys_menus_action`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID', AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `web_user`
--
ALTER TABLE `web_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID';

--
-- 使用表AUTO_INCREMENT `web_video`
--
ALTER TABLE `web_video`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'ID';
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
