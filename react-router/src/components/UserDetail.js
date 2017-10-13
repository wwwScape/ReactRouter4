import React,{Component} from 'react'
class UserDetail extends Component{
    render(){
        // this.props三个属性
        // history : 路由跳转，包含location
        // match : 匹配结果
        // location：pathname当前路径

        let id = this.props.match.params.id;

        // 从缓存中读取字用户列表符串 null或者是字符串
        let userStr = localStorage.getItem("users");

        // 转化成对象数组
        let users = userStr ? JSON.parse(userStr) : [];

        let user = users.find(user=>user.id == id);

        return(

            <div>
                {/*{this.props.match.params.id}*/}

                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>姓名</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default UserDetail;
