import React, { useEffect, useState } from 'react'
import Nav from '../../components/navbar/Nav'
import styles from '../../styles/Edit.module.css'
import profile from '../../public/img/profile.png'
import map from '../../public/img/map.png'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProfileWorker = () => {
    const router = useRouter();
    const [workers, setWorkers] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/worker/profile/${router.query.id}`)
                .then((res) => {
                    setWorkers(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    //get skill
    const [skils, setSkils] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/skill/${router.query.id}`)
                .then((res) => {
                    setSkils(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    //get skill
    const [portos, setPortos] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/portofolio/${router.query.id}`)
                .then((res) => {
                    setPortos(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    //get experience
    const [experiences, setExperiences] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/experience/${router.query.id}`)
                .then((res) => {
                    setExperiences(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const [role,setRole] = useState();
    useEffect(()=>{
        const isRole = localStorage.getItem("role")
        setRole(isRole)
    },[])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (
        <>
            <Nav />
            <div className={styles.purples}></div>
            <div className="container">
                <div className="row ">
                    <div className="col-lg-4 col-md-4">
                        <div className={styles.wrapper}>
                            {workers.map((worker, index) => (
                                <div key={index}>
                                    <div className='d-flex justify-content-center'>
                                        <Image src={worker.photo === "null" || worker.photo === null ? profile : worker.photo}
                                            width={150}
                                            height={150}
                                            style={{ marginTop: "20px", borderRadius: "50%" }} alt='profile' />
                                    </div>
                                    <div className="container px-5 mt-5">
                                        <div>
                                            <p className={styles.name}>{worker.name == "null" || worker.name === null ? "Name" : worker.name}</p>
                                            <p className={styles.job}>{worker.job_desk == "null" || worker.job_desk === null ? "Job desk" : worker.job_desk}</p>
                                            <p className={styles.adress}><span><Image src={map} alt='map' /></span>{worker.domisili == "null" || worker.domisili === null ? "Domisili" : worker.domisili}</p>
                                            <p className={styles.adress}>{worker.work_place == "null" || worker.work_place === null ? "Work place" : worker.work_place}</p>
                                            <p className={styles.adress}>{worker.description == "null" || worker.description === null ? "Description" : worker.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="container mt-5">
                                            <h3 style={{fontSize:"18px",color:"#1f2a36",marginLeft:"30px",fontWeight:600}}>Skill</h3>
                                            <div style={{marginLeft:"18px"}} className="d-flex flex-wrap">
                                                {skils.map((skil, index) => (
                                                    <div key={index} className={styles['skill-item']}>{skil?.skill_name}</div>
                                                ))}
                                            </div>
                                            <div className='mt-5 pb-5'>
                                                <button onClick={() => router.push(`/hire/${router.query.id}`)} style={{marginLeft:"18px",width:"300px",border:"none",background:"#5E50A1",color:"#fff",padding:"5px"}} className='rounded pill'>Hire</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <div className={styles['wrapper-right']}>
                            <h2 className='ps-5 pt-3' id={styles.title}>Portofolio</h2>
                            <hr style={{ maxWidth: "80px", marginLeft: "35px" }} />
                            <div className="ps-2 pe-2 pb-5">
                                <div className="container">
                                    <div className="row text-center">
                                        {portos.map((porto, index) => (
                                            <div key={index} className="col-lg-4 col-md-4 mt-4">
                                                <Image src={porto?.photo} className='card-img-top' height={200} width={500} quality={100} style={{ objectFit: "cover", borderRadius: "4px" }} alt='porto' />
                                                <p className='mt-3'>{porto?.apk_name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5" id={styles['wrapper-right']}>
                            <h2 className='ps-5 pt-3' id={styles.title}>Pengalaman kerja</h2>
                            <hr style={{ maxWidth: "150px", marginLeft: "35px" }} />
                            <div className="ps-2 pe-2 pb-5">
                                <div className="container">
                                    {experiences.map((experience, index) => (
                                        <div key={index} className='ps-5'>
                                            <p id={styles.title}>{experience?.position}</p>
                                            <p style={{ fontSize: "14px", color: "#46505C" }}>{experience?.company_name}</p>
                                            <p style={{ fontSize: "12px", color: "#9EA0A5" }}>{experience?.work_start}<span> - </span><span style={{ fontSize: "12px", color: "#9EA0A5" }}>{experience?.work_end}</span></p>
                                            <p className='mt-3' style={{ width: "450px" }}>{experience?.description}</p>
                                            <hr />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileWorker