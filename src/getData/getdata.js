import axios from '../request'


//登录接⼝
export const loginApi = (tel, pwd) => axios.post("/api/v1/pri/user/login",{
    "phone":tel,
    "pwd":pwd
})

//注册接口
export const registerApi = (phone,username, pwd,email) => axios.post("/api/v1/pri/user/register",{
    "name":username,
    "phone":phone,
    "pwd":pwd,
    "mail":email

})

//⽤户信息接⼝
export const getUserInfo =
    (token)=>axios.post("/api/v1/pri/user/user_info",{},{
        headers:{
            "token":token
        }
    })


//轮播图接⼝
export const getBanner = () => axios.get("/api/v1/pub/knowledge/banner_picture")

//热门文章接⼝
export const top_article = () => axios.get("/api/v1/pub/knowledge/top_article")

//热门twi接⼝
export const top_post = () => axios.get("/api/v1/pub/knowledge/top_post")

//Type接⼝
///pub/v1/pic/type
//api/v1/pub/knowledge/type
export const getTypeData = () => axios.get("/api/v1/pub/knowledge/type")


//知识圈主页界面接口
export const getknowledge = ()=> axios.get("/api/v1/pub/knowledge/recommend")


//list_contain
///api/v1/pub/knowledge/list/article
export const getlist_contain_article = (id,curpage)=> axios.post("/api/v1/pub/knowledge/list/article",{
        "type": id,
        "cur_page": curpage
})
//    /pub/v1/pic/video
///api/v1/pub/knowledge/list/video
export const getlist_contain_video = (id,curpage)=> axios.post("/api/v1/pub/knowledge/list/video",{

        "type": id,
        "cur_page": curpage

})

//具体文章页面
///pub/v1/pic/article
///api/v1/pub/knowledge/content/article
export const get_article = (id,uid)=> axios.post("/api/v1/pub/knowledge/content/article",{
    "article_id":id,
    "user_id" :uid
})
//文章点赞
export const like_article = (id,uid,is_like)=> axios.post("/api/v1/pub/knowledge/content/article_like",{
    "article_id":id,
    "user_id":uid,
    "is_like":is_like
})

//具体视频页面
///api/v1/pub/knowledge/content/video
///pub/v1/pic/video
// export const get_video = (id)=> axios.post("/api/v1/pub/knowledge/content/video",{
//    "id":id
// })
export const get_video = (vid,uid)=> axios.post("/api/v1/pub/knowledge/content/video",{
    "video_id":vid,
    "user_id" : uid
})

export const like_video = (vid,uid,is_like)=> axios.post("/api/v1/pub/knowledge/content/video_like",{
    "video_id":Number(vid),
    "user_id" : Number(uid),
    "is_like": Number(is_like)
})

//videorecommand

export const get_video_recommend = (id)=> axios.post("/api/v1/pub/knowledge/content/video_recommend",{
    "type":id
})


//个人信息修改
// 、/api/v1/pri/user/change_user_info
export const change_user_info = (name,phone,mail,sex,sen,pwd,token)=> axios.post("/api/v1/pri/user/change_user_info",{
    "name":name,
    "phone":phone,
    "mail":mail,
    "sex":sex,
    "introduce":sen,
    "pwd":pwd
},{
    headers:{
        "token":token
    }
})

//个人post
export const to_own_post = (cur_page,token)=> axios.post("/api/v1/pri/user/own_post",{
    "cur_page":cur_page
},{
    headers:{
        "token":token
    }
})

//忘记密码
export const forget_pwd = (phone)=>
    axios.post("/api/v1/pri/user/forget_pwd",{
        "phone":phone
    })

export const new_pwd = (id,pwd)=>
    axios.post("/api/v1/pri/user/new_pwd",{
        "id":id,
        "pwd":pwd
    })

//讨论圈twitter
export const get_twitter = (type,shortpage,longpage) => axios.post("/api/v1/pub/forum/recommend",{
        "type": type,
        "short_page": shortpage,  //请求返回第几页的推文，初次请求发送1
        "long_page": longpage //请求返回第几页的推文，初次请求发送1
})

//讨论圈详细页面
export const get_talk_contain = (pid,uid,page) => axios.post("/api/v1/pub/forum/content",{
        "post_id": pid,
        "user_id": uid,
        "page": page  //请求返回第几页的评论，初次请求发送1
})

//讨论圈发布
export const add_post = (title,content,author_id,is_short) => axios.post("/api/v1/pub/forum/add_post",{
    "title":title,
    "content": content,
    "author_id": author_id,
    "is_short": is_short
})

//讨论圈删除
export const del_post = (id) => axios.post("/api/v1/pub/forum/delete_post",{
    "id": id
})

//讨论点赞
export const like_post = (pid,uid,is_like) => axios.post("/api/v1/pub/forum/post_like",{
    "post_id":pid,
    "user_id": uid,
    "is_like":is_like
})

//com
// 点赞
export const like_com = (pid,uid,is_like) => axios.post("/api/v1/pub/forum/comment_like",{
    "comment_id":pid,
    "user_id": uid,
    "is_like":is_like
})

//评论添加
export const add_com = (content,pid,uid) => axios.post("/api/v1/pub/forum/add_comment",{
    "content":content,
    "post_id":Number(pid),
    "author_id":Number(uid)
})
//讨论删除
export const del_com = (id,pid) => axios.post("/api/v1/pub/forum/delete_comment",{
    "comment_id": id,
    "post_id": pid
})

//讨论修改
export const change_com = (id,title,content) => axios.post("/api/v1/pub/forum/change_post",{
    "id":id, // 推文id，访问推文时传输
    "title":title, // 新标题
    "content":content // 新内容
})
