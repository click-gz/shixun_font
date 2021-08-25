const Mock = require('mockjs')

//const Random =  Mock.Random;

let Result={
    code: 200,
    msg: 'ok',
    data: null,
}



// Mock.mock('/pri/v1/user/login', 'post', () =>{
//     Result.data={
//        token: Random.string(32),
//         name: "admin",
//        avater: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
//     }
//     return Result;
// })
//
//
// Mock.mock('/pri/v1/user/register', 'post', () =>{
//     Result.data={
//         token: Random.string(32),
//         name: "admin",
//         head_img: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
//     }
//     return Result;
// })
// //RegExp('/pri/v1/user/getUserInfo' + ".*")
// Mock.mock('/pri/v1/user/getUserInfo' ,'post', () =>{
//
//     Result.data={
//     //{"token","avater","username"}
//         createTime: "2001-1-1",
//         username:"admin",
//         avater:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
//     }
//     return Result;
// })
/*
{
    code: 200,
    msg: 'ok',
    data: {
        banner_list[]
    }
}

 */
Mock.mock(RegExp('/pub/v1/pic/list_banner'),'get', () =>{

    Result.data={
       banner_list:["https://img2.baidu.com/it/u=509927313,2330993477&fm=26&fmt=auto&gp=0.jpg",
           "https://img0.baidu.com/it/u=4022519851,3662880522&fm=26&fmt=auto&gp=0.jpg",
           "https://img1.baidu.com/it/u=855813662,1610714924&fm=26&fmt=auto&gp=0.jpg",
           "https://img0.baidu.com/it/u=2569203958,1380440039&fm=26&fmt=auto&gp=0.jpg",
           "https://img2.baidu.com/it/u=747594481,487990897&fm=26&fmt=auto&gp=0.jpg"]
    }
    return Result;
})

Mock.mock(RegExp('/pub/v1/pic/type'),'get', () =>{

    Result.data={
        type_list:[
            {"type": 1,"link":"https://img2.baidu.com/it/u=747594481,487990897&fm=26&fmt=auto&gp=0.jpg"},
            {"type": 2,"link":"https://img2.baidu.com/it/u=747594481,487990897&fm=26&fmt=auto&gp=0.jpg"},
            {"type": 3,"link":"https://img2.baidu.com/it/u=747594481,487990897&fm=26&fmt=auto&gp=0.jpg"},
            {"type": 4,"link":"https://img2.baidu.com/it/u=747594481,487990897&fm=26&fmt=auto&gp=0.jpg"},
        ]
    }
    return Result;
})

Mock.mock(RegExp('/pub/v1/pic/article' + ".*"),'get', () =>{
    let article_list=[]
    for (let i = 0; i < 10; i++) {

        let newArticleObject = {
            "summary": "auidhuaishduia",
            "title":"啊八八八八八八八八八八",
            "author": "admin",
            "id": 1,
            "create_time" : "2001-1-1"
        }
        article_list.push(newArticleObject)
    }
    Result.data={
        article_list
    }
    return Result;
})
Mock.mock(RegExp('/pub/v1/pic/video'),'get', () =>{
    let video_list=[]
    for (let i = 0; i < 10; i++) {

        let newArticleObject = {
            "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
            "title":"啊八八八八八八八八八八",
            "author": "admin",
            "id": 1
        }
        video_list.push(newArticleObject)
    }
    Result.data={
        video_list
    }
    return Result;
})
// Mock.mock('/pub/v1/knowledge','get', () =>{
//
//     Result.data={
//         video:{
//             //运动康复，小儿脑瘫，视觉康复，脊柱损伤，骨折术后
//             //1,2,3,4,5
//             "video1":[
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八dfsfsdfsdfsdfsdfasdasdasdasdasdasdasdasdasdasd按规范惊恐山谷的风库哈斯的咖啡好苦安徽KFHASDIJKFAsdfsdf八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//             ],
//             "video2":[
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//             ],
//             "video3":[
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//             ],
//             "video4":[
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//             ],
//             "video5":[
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//                 {
//                     "summary": "https://th.bing.com/th/id/OIP.yEiQP8vKSaZ68qfjlQ9bQAHaJ4?w=193&h=257&c=7&o=5&dpr=1.03&pid=1.7",
//                     "title":"啊八八八八八八八八八八",
//                     "author": "admin",
//                     "id": 1
//                 },
//             ]
//         },
//         article: {
//             //运动康复，小儿脑瘫，视觉康复，脊柱损伤，骨折术后
//             //1,2,3,4,5
//             "article1": [
//                 //100字...
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//             ],
//             "article2": [
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//             ],
//             "article3": [
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time":" 2001-1-1",
//                 },
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//
//             ],
//             "article4": [
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//             ],
//             "article5": [
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//                 {
//                     "summary":
//                         "通过康复训练，我感到这虽然是偶然的，但同时也是长期以来对自己放松要求的必然结果。 我们都知道, 只要有意义, 那么就必须慎重考虑康复训练因何而发生? 我们不得不面对一个非常尴尬的事实, 那就是, 因此我们不能奢求人生，不能抱怨生活，相反，我们要以感恩的心态来对待这并不算漫长的...",
//                     "title": "来自狗屁不通文章生成器",
//                     "author": "admin",
//                     "id": 1,
//                     "create_time": "2001-1-1",
//                 },
//             ],
//         }
//     }
//     return Result;
// })
//
// Mock.mock('/logout', 'post', () =>{
//
//     return Result;
// })
