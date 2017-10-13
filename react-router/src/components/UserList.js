import React,{Component} from 'react'
import {Link} from 'react-router-dom'
class UserList extends Component{

    constructor(props){
        super(props);
        this.state = {users:[]};
    }

    componentWillMount(){
        // 从缓存中读取字用户列表符串 null或者是字符串
        let userStr = localStorage.getItem("users");

        // 转化成对象数组
        let users = userStr ? JSON.parse(userStr) : [];

        this.setState({users});
    }

    render(){
        return(
            <div>
                <ul className="list-group">
                    {/*<li className="list-group-item">*/}
                        {/*<Link to="/user/detail/1">张三</Link>*/}
                    {/*</li>*/}
                    {/*<li className="list-group-item">*/}
                        {/*<Link to="/user/detail/2">李四</Link>*/}
                    {/*</li>*/}
                    {
                        this.state.users.map(function (user) {
                            return (
                                <li className="list-group-item" key={user.id}>
                                    <Link to={"/user/detail/"+user.id}>{user.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default UserList;
