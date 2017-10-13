import React from 'react'
import {Route,Link} from 'react-router-dom'

/**
 * 有的组件，不管当前路径是否匹配，都显示内容，使用children
 */

export default function ({to,label}) {// 参数解构，两个属性to,label
    return (
        <Route path={to} children={({match})=>{// 三个props:match,history,location,解构出来{match}
            console.log(match)
            return <li className={ match ? 'active' : '' }><Link to={to}>{label}</Link></li>
        }} />
    )
}

/*
*
* Route
* 属性path=""，component=""
*
* 方法：render={()=>{}} children={()=>{}}
*
* */