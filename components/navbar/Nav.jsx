import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../public/logo/purple.png'
import style from './Nav.module.css'
import Link from 'next/link'
import bell from '../../public/img/bel.png'
import mail from '../../public/img/mail.png'
import profile from '../../public/img/profile.png'
import { useRouter } from 'next/router'

const Nav = () => {
    const router = useRouter();
    const [login, setLogin] = useState();

    useEffect(()=>{
        const isLogin = localStorage.getItem("id_worker")
        setLogin(isLogin)
    },[]);
    return (
        <>
            <div className="container-fluid bg-white fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/"><Image src={logo} /></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav mx-auto">
                                    <div className="">
                                    </div>
                                </div>
                                <div className="">
                                    <button className={style.bell} type="button">
                                        <Image src={bell} />
                                    </button>
                                    <button className={style.bell} type="button">
                                        <Image src={mail} />
                                    </button>
                                    <div className="btn-group">
                                        <div
                                            className="ms-md-5 ms-4"
                                            data-bs-toggle="dropdown"
                                            data-bs-display="static"
                                            aria-expanded="false"
                                        >
                                            <Image src={profile} className={style.img} />
                                        </div>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                            <li>
                                                <Link href={`/edit-profile/${login}`}>
                                                    <button
                                                        className="dropdown-item"
                                                        type="button"
                                                        style={{ display: "inline-block" }}
                                                    >
                                                        Edit profile
                                                    </button>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href={`/profile-worker/${login}`}>
                                                    <button
                                                        className="dropdown-item"
                                                        type="button"
                                                        style={{ display: "inline-block" }}
                                                    >
                                                        Profile
                                                    </button>
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    type="button"
                                                    onClick={(e) => {
                                                        localStorage.clear();
                                                        router.push("/");
                                                        setTimeout(function () {
                                                            window.location.reload();
                                                        }, 1000);
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* <button className={style.circle} type="button">
                                <Link href={'/profile-worker'}><Image src={profile} className={style.img}/></Link>
                            </button> */}

                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>

    )
}

export default Nav