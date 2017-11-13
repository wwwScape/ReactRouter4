## react-router v4

[中文文档:reacttraining.cn](http://reacttraining.cn/web/example/basic)

[react-router4 API 详解](https://github.com/react-translate-team/react-router-CN/tree/master/packages/react-router/docs/api)


### Router

Router是所有路由组件共用的底层接口，一般我们的应用并不会使用这个接口，而是使用高级的路由：

	<BrowserRouter>
	
	<HashRouter>
	
	<MemoryRouter>
	
	<NativeRouter>
	
	<StaticRouter>

Route组件主要的作用就是当一个location匹配路由的path时，渲染某些UI。

### Route

Route渲染的三种方法：

	<Route path='/home' component={Home}>

	<Route path='/home' render={()=>{<div>Home</div>}}>

	<Route children:func>

		<ul>
		  <ListItemLink to="/somewhere"/>
		  <ListItemLink to="/somewhere-else"/>
		</ul>
		
		const ListItemLink = ({ to, ...rest }) => (
		  <Route path={to} children={({ match }) => (
		    <li className={match ? 'active' : ''}>
		      <Link to={to} {...rest}/>
		    </li>
		  )}/>
		)

在不同的情况下每个都特别有用，对于某个<Route>，你只能使用这些props其中的一个，绝大多数的时候会使用component。

上述三种渲染方法都会获得相同的三个的属性props：

1. match

	match 对象包含了 <Route path> 如何与URL匹配的信息。match 对象包含以下属性：
	
	* params -（ object 类型）即路径参数，通过解析URL中动态的部分获得的键值对。
	* isExact - 当为 true 时，整个URL都需要匹配。
	* path -（ string 类型）用来做匹配的路径格式。在需要嵌套 <Route> 的时候用到。
	* url -（ string 类型）URL匹配的部分，在需要嵌套 <Link> 的时候会用到。
	
	你可以在以下地方获取 match 对象：
	
	* 在 Route component 中，以 this.props.match 方式。
	* 在 Route render 中，以 ({ match }) => () 方式。
	* 在 Route children 中，以 ({ match }) => () 方式
	* 在 withRouter 中，以 this.props.match 方式
	* matchPath 的返回值

	当一个 Route 没有 path 时，它会匹配一切路径，你会匹配到最近的父级。在 withRouter 里也是一样的。

2. [location](https://github.com/react-translate-team/react-router-CN/blob/master/packages/react-router/docs/api/location.md)

3. [history](https://github.com/react-translate-team/react-router-CN/blob/master/packages/react-router/docs/api/history.md)

	history 对象通常会具有以下属性和方法：
	
	* length -（ number 类型）指的是 history 堆栈的数量。
	* action -（ string 类型）指的是当前的动作（action），例如 PUSH，REPLACE 以及 POP 。
	* location -（ object类型）是指当前的位置（location），location 会具有如下属性：
	* pathname -（ string 类型）URL路径。
	* search -（ string 类型）URL中的查询字符串（query string）。
	* hash -（ string 类型）URL的 hash 分段。
	* state -（ string 类型）是指 location 中的状态，例如在 push(path, state) 时，state会描述什么时候 location 被放置到堆栈中等信息。这个 state 只会出现在 browser history 和 memory history 的环境里。
	* push(path, [state]) -（ function 类型）在 hisotry 堆栈顶加入一个新的条目。
	* replace(path, [state]) -（ function 类型）替换在 history 堆栈中的当前条目。
	* go(n) -（ function 类型）将 history 对战中的指针向前移动 n 。
	* goBack() -（ function 类型）等同于 go(-1) 。
	* goForward() -（ function 类型）等同于 go(1) 。
	* block(prompt) -（ function 类型）阻止跳转，（请参照 history 文档）。

	history是可变的，因此建议从<Route\>的props或者location,而不是从 history.location 直接获取。这样做可以保证 React 在生命周期中的钩子函数正常执行


Route的属性

path:

	<Route path="/users/:id" component={User}/>

exact:当值为true时，则要求路径与location.pathname必须 完全 匹配。

	<Route exact path="/one" component={About}/>

strict:当设为true的时候，有结尾斜线的路径只能匹配有斜线的location.pathname，这个值并不会对location.pathname中有其他的片段有影响。

	<Route strict path="/one/" component={About}/>


### Switch

渲染匹配地址(location)的第一个 <Route\> 或者 <Redirect\>

### Redirect

渲染<Redirect> 的时候将会导航到一个新的地址（location）。这个新的地址（location）将会覆盖在访问历史记录里面的原地址，就像服务端的重定向（HTTP 3XX）一样。

属性：

1. from

	需要被重定向的路径（pathname）。当渲染一个包含在<Switch>里面的<Redirect>的时候，这可以用作匹配一个地址（location）。

		<Switch>
		  <Redirect from='/old-path' to='/new-path'/>
		  <Route path='/new-path' component={Place}/>
		</Switch>

2. to
	
	(1)string
	
	重定向目标URL。
	
		<Redirect to="/somewhere/else"/>

	(2)obiect

	重定向目标地址(location)。
	
		<Redirect to={{
		  pathname: '/login',
		  search: '?utm=your+face',
		  state: { referrer: currentLocation }
		}}/>

3. push

	当设置为 true 时，重定向（redirecting）将会把新地址加入访问历史记录里面，而不是替换掉目前的地址。
		
		<Redirect push to="/somewhere/else"/>

### Prompt

当用户离开当前页的时候做出提示. 当你的应用处在特定状态, 此状态不希望用户离开时(例如填写表格到一半), 你应该使用<Prompt>。 

属性：

1. message
	
	（1）string

	当用户尝试导航离开时，提示用户的消息。
		
		<Prompt message="你确定要离开吗？"/>

	（2）func
	
	会与用户试图前往下一个地址（location） 和 action 一起被调用。
	
	函返回一个字符串用作向用户提示，或者返回true用作允许过渡。
	
		<Prompt message={location => (
		  `你确定你要前往 ${location.pathname} 吗?`
		)}/>


2. when：bool

	你可以随时渲染<Prompt>，而不是有条件地在警戒后面渲染它。

	当when={true} 时，禁止导航

	当when={false} 时，允许导航

		<Prompt when={formIsHalfFilledOut} message="确定吗？"/>


### WithRouter

