import React from 'react'
import {
    BrowserRouter as Router,// 容器
    Route, // 一条路由
    Link,
    Switch
} from 'react-router-dom'

import Home from './Home'               // 首页
import User from './User'               // 用户
import Profile from './Profile'         // 个人中心
import 'bootstrap/dist/css/bootstrap.css'

/*当访问个人设置的时候，需要先判断用户是否登录，如果已登录则允许进入，否则的话则不允许进入*/
import Login from './Login'              // 登录
import ProtectedRoute from './ProtectedRoute'

// 自定义菜单
import MenuLink from './MenuLink'

// 404
import NotFound from './NotFound'

class App extends React.Component{
    render(){
        return(
            <Router>
                <div>
                    <nav className="navbar navbar-inverse">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <div className="navbar-brand">系统管理</div>
                            </div>
                        </div>
                        <ul className="nav navbar-nav">
                            {/*<li>*/}
                                {/*<Link to="/home">首页</Link>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                                {/*<Link to="/user">用户</Link>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                                {/*<Link to="/profile">个人中心</Link>*/}
                            {/*</li>*/}
                            <MenuLink label="首页" to="/home"/>
                            <MenuLink label="用户中心" to="/user"/>
                            <MenuLink label="个人设置" to="/profile"/>
                        </ul>
                    </nav>

                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                {/*以下两种写法一样：*/}
                                {/*<Route path="/" render={props=><div>首页</div>} />*/}
                                {/*<Route path="/" component={Home} />*/}
                                {/*<Route path="/:name" render={props=><div>name:{props.match.params.name}</div>}></Route>*/}
                                <Switch>
                                    <Route exact path="/" component={Home} />{/*exact：精确匹配，*/}
                                    {/*<Route path="/:name" render={props=><div>name:{props.match.params.name}</div>}></Route>*/}
                                    <Route path="/home" component={Home}/>
                                    <Route path="/user" component={User}/>
                                    <Route path="/login" component={Login}/>

                                    <ProtectedRoute path="/profile" component={Profile}/>
                                    {/*<Route path="/profile" component={Profile}/>*/}

                                    {/*页面不存在*/}
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;

/*

export default (
    <Router>
        <div>
            <Route path="/home" component={Home}/>
            <Route path="/user" component={User}/>
            <Route path="/profile" component={Profile}/>
        </div>
    </Router>
)

说明：
（1）使用这种写法时，在index.js中引入改文件的时候，

    import App from './components/App'

     ReactDOM.render(
        App, document.getElementById('root')
     )

（2）如果是使用class App extends React.Component{}这种写法

     import App from './components/App'

     ReactDOM.render(
     <App/>, document.getElementById('root')
     )

*/
