import React,{Component} from 'react'
import {Prompt} from 'react-router-dom' // 引入路由的弹出框
class UserAdd extends Component{
    constructor(props){
        super(props);

        // 默认不阻止跳转
        this.state={
            blocking:false
        }

    }
    handleSubmit=()=>{
        // ref属性可以操作真实的DOM元素，获取到input的value
        let name = this.name.value;

        // 从缓存中读取字用户列表符串 null或者是字符串
        let userStr = localStorage.getItem("users");

        // 转化成对象数组
        let users = userStr ? JSON.parse(userStr) : [];

        // 向此数组中加入新的对象
        users.push({id:Date.now(),name});

        // 再把新数组重新缓存
        localStorage.setItem("users",JSON.stringify(users));

        // 先设置状态在跳转
        this.setState({
            blocking:false
        },()=>{
            // 通过history的push方法，跳转路由到list列表页面
            this.props.history.push('/user/list');
        })

    }
    // 当input有内容的时候
    handleChange = (event)=>{
        this.setState({
            blocking:event.target.value && event.target.value.length>0
        })
        console.log(this.state.blocking)
    }

    render(){
        return(
            <div>
                {/*提示框 Prompt*/}
                <Prompt
                    when={this.state.blocking}
                    message={(location)=>`确定要跳转到${location.pathname}吗？`}
                />

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="name">姓名</label>
                        <input type="text" id="name" className="form-control" ref={ref=>this.name=ref} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn bg-primary" value="添加"/>
                    </div>
                </form>
            </div>

        )
    }
}
export default UserAdd;
