/**
 * Created by girl on 16/5/24.
 */
import Get from "./lib/Get";
import Post from "./lib/Post";
import JpGet from "./lib/JpGet";
import JpPost from "./lib/JpPost";
/**
 *
 * @type {{Get, Post, JpGet, JpPost}}
 **                                     目录
 *							get方法		     Get
 *							post方法		     Post
 *							JpGet跨域访问		 JpGet
 *							get方法		     Get
 *							文件提交         PostFile
 */
const Ajax = {
    Get: Get,
    Post: Post,
    JpGet: JpGet,
    JpPost: JpPost
}

module.exports = Ajax;
