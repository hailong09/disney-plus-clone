import React, { useEffect } from 'react'
import styled from 'styled-components'
import ImgSlider from './ImgSlider'
import Movies from './Movies'
import Viewers from './Viewers'
import db from '../firebase'
import {useDispatch, useSelector} from 'react-redux'
import {setMovies} from '../features/movie/movieSlice'
import {seltectUserName} from '../features/user/userSlice'
import { Redirect, useHistory } from 'react-router'
const Home = () => {
    const dispatch = useDispatch();
    const username = useSelector(seltectUserName);
    const history = useHistory();
    useEffect(() => {
        if(username){
            db.collection("movies").onSnapshot((snapshot) => {
                const tempMovies = snapshot.docs.map((doc) => {
                    return {id: doc.id, ...doc.data()}
    
                })
                dispatch(setMovies(tempMovies));
    
            })
        }
        else{
            <Redirect to="/login"/>
        }
       
    }, [username])
    return (
       <Container>
           <ImgSlider/>
           <Viewers/>
           <Movies/>
        </Container>
           
       
    )
}

export default Home


const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow: hidden;
    &:before{
        background: url('/images/home-background.png') center center / cover no-repeat fixed ;
        content: "";
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index: -1
    }
`