import { useState } from 'react';
import logo from './logo.svg';

const Home = () => {
    const [params, setParams] = useState({name:'', password: ''})
    const login = () => {
        const {name, password} = params
        if (!name.trim().length || !password.trim().length) {
            alert('请输入账号密码!')
            return
        }
        fetch('http://localhost:3000/react/login',{
            method: 'POST',
            headers: {
        　　　　'Content-Type': 'application/json'
        　　 },
            body: JSON.stringify({name, password})
        }).then(res => res.json())
        .then(res => res.error ? alert('登录失败') : alert('登录成功'))
    }
    return <div>
        账号<input value={params.name} onChange={e => setParams({...params, name: e.target.value})}/>
        <br/>
        密码<input type="password" value={params.password} onChange={e => setParams({...params, password: e.target.value})}/>
        <br/>
        <button style={{marginTop: '20px'}} onClick={login}>登录</button>
        <br/>
        <img src={logo}/>
    </div>
}

export default Home;