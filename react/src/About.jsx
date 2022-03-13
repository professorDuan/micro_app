import React,{ useState,useEffect } from "react"

const About = () => {
    const [list ,setList] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/react/about').then(res => res.json()).then(res => setList(res.list)).catch(() => setList([]))
    },[])
    return <ul>
        {list.map((item, index) => <li key={index}>{item.name}</li>)}
    </ul>
}

export default About