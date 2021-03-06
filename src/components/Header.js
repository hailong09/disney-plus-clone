import React, { useEffect } from 'react'
import styled from 'styled-components'
import {Link, useHistory} from 'react-router-dom'
import {seltectPhoto, seltectUserName, setSignOut, setUserLogin} from '../features/user/userSlice'
import {useSelector, useDispatch} from 'react-redux'
import {auth, provider} from '../firebase'
const Header = () => {

    const username = useSelector(seltectUserName)
    const useserPhoto = useSelector(seltectPhoto);
    const dispatch = useDispatch();
    const history = useHistory();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                const {user} = result;
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))

                history.push("/")
            })
    }

    const signOut = () => {
        auth.signOut()
            .then(() =>{
                dispatch(setSignOut());
                history.push("/login");
            })
    }

    useEffect(()=> {
        auth.onAuthStateChanged(async (user) => {
            if(user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))

                history.replace("/")
            }
        })
    }, [])
    return (
       
            <Nav>
                <Link to={username ? "/" : "/login"}>
                    <Logo src="/images/logo.svg" alt="logo"/>
                </Link>
                    {!username ? 
                    
                    <LoginContainer>
                        <Login onClick={signIn}>Login</Login>
                    </LoginContainer>
                     :
                    <>
                        <NavMenu>
                        <a href='/'>
                            <img src="/images/home-icon.svg" alt='home-icon' />
                            <span>Home</span>
                        </a>
                        <a href='/'>
                            <img src="/images/search-icon.svg" alt='search-icon' />
                            <span>Search</span>
                        </a>
                        <a href='/'>
                            <img src="/images/watchlist-icon.svg" alt='watchlist-icon' />
                            <span>Watchlist</span>
                        </a>
                        <a href='/'>
                            <img src="/images/original-icon.svg" alt='original-icon' />
                            <span>Originals</span>
                        </a>
                        <a href='/'>
                            <img src="/images/movie-icon.svg" alt='movie-icon' />
                            <span>Movies</span>
                        </a>
                        <a href='/'>
                            <img src="/images/series-icon.svg" alt='series-icon' />
                            <span>Series</span>
                        </a>
                    </NavMenu>
                    <UserImg src={useserPhoto} onClick={signOut}/>
                    </>
                
                }
              
               
            </Nav>
       
    )
}

export default Header

const Nav = styled.nav`
  
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x:hidden;
    

`
const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    a {
    
        display:flex;
        align-items: center;
        text-decoration: none;
        color: white;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after{
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform-origin: left center;
                transform: scaleX(0);
                
            }

            
        }

        &:hover{
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }        
        }
    }
    
`

const UserImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;

`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px ;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;  
    background-color: rgba(0,0,0,0.6);
    transition: all 0.2 ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }

`

const LoginContainer = styled.div`
    display: flex;
    flex:1;
    justify-content: flex-end;
    align-items: center
`