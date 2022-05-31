import { ajax, ajax1, ajax2 } from "./ajax";

const BASE = "api1";

//登陆
export const getBanner = () => ajax1(BASE + "/banner/json", {}, "GET");
//置顶文章
export const getTopArticle = () => ajax1(BASE + "/article/top/json", {}, "GET");
//首页列表
export const getArticle = pageNum => ajax1(BASE + `/article/list/${pageNum}/json`, {}, "GET");
//广场列表
export const getUserArticle = pageNum => ajax1(BASE + `/user_article/list/${pageNum}/json`, {}, "GET");
//导航数据
export const getNaviJson = () => ajax1(BASE + `/navi/json`, {}, "GET");
//体系数据
export const getTreeJson = () => ajax1(BASE + `/tree/json`, {}, "GET");
//知识体系下的文章
export const getTreeJsonList = (pageNum, cid) => ajax1(BASE + `/article/list/${pageNum}/json?cid=${cid}`, {}, "GET");
//热门项目
export const getHotProjects = (pageNum, cid) => ajax1(BASE + `/article/listproject/${pageNum}/json`, {}, "GET");
//项目分类
export const getProjectTree = () => ajax1(BASE + `/project/tree/json`, {}, "GET");
//项目列表数据
export const getProjectList = (pageNum, cid) => ajax1(BASE + `/project/list/${pageNum}/json?cid=${cid}`, {}, "GET");
//问答
export const getAskList = pageNum => ajax1(BASE + `/wenda/list/${pageNum}/json`, {}, "GET");
//公众号列表
export const getWxarticleChapters = () => ajax1(BASE + `/wxarticle/chapters/json`, {}, "GET");
//查看某个公众号历史数据
export const getWxarticleList = (id, pageNum) => ajax1(BASE + `/wxarticle/list/${id}/${pageNum}/json`, {}, "GET");
//登录
export const login = user => ajax1(BASE + `/user/login`, user, "POST");
//注册
export const register = user => ajax1(BASE + `/user/register`, user, "POST");
//退出
export const logout = () => ajax1(BASE + `/user/logout/json`, {}, "GET");
//获取个人积分，需要登录后访问  //个人信息
export const getUserCoin = () => ajax1(BASE + `/lg/coin/userinfo/json`, {}, "GET");
//个人积分获取列表
export const getUserCoinList = () => ajax1(BASE + `/lg/coin/list/1/json`, {}, "GET");
//积分排行榜
export const getRankCoinList = () => ajax1(BASE + `/coin/rank/1/json`, {}, "GET");

//--------------------   系统2  --------------------//
const BASE2 = "api2";
const BASE3 = "api3";
export const getWwallpaperMenu = (page, sorting, q) =>
    ajax2(BASE2 + `/wallhaven/search?page=${page}&sorting=${sorting}&topRange=6M&q=${q}`, {}, "GET");
export const getWallpaperVideo = () => ajax(BASE3 + `/json/wallpaperVideo.json`, {}, "GET");

//--------------------   系统2  --------------------//

export const getChinaColor = () => ajax("/china_color.json", {}, "GET");
const BASE4 = "api4";
export const hLogin = user => ajax("http://192.168.100.167:8000", user, "GET");
