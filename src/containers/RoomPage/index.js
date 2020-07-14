import React, { Component } from 'react'
import Square from '../../components/Square'
import axios from 'axios';
const host = process.env.PUBLIC_URL+'/room'
export default class RoomPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             listRoom:[]
        }
    }
    updateRoom(){
        axios.get(host).then((res)=>{
            console.log(res)
        })
    }
    render() {
        return (
            <Square id ={1}></Square>
        )
    }
}
