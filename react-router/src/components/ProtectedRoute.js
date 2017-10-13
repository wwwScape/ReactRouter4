import React,{Component} from 'react'
import {Redirect,Route} from 'react-router-dom'
// 当通过函数来定义组件的时候，参数是属性对象
// 当一个组件不需要状态的时候用函数组建，当一个组件必须用状态的时候用类来声明
// props两个属性：props={path="/profile"  component=Profile}
// rest = {path="/profile"}
// <Route {...rest}/> == <Route path="/profile"/>
export default function ({component:Component,...rest}) {
    // 参数结构赋值，属性名component，当前变量Component
    // ...rest,其他运算符，其余参数
    return <Route {...rest} render={
        (props)=>
            localStorage.getItem("login")
                ? <Component/>
                : <Redirect to={
                    {
                        pathname:"/login",
                        state:{from:props.location.pathname}
                    }
                }/>
    }/>
    
}
