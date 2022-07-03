import React, { useEffect, useRef, useState } from 'react'

import h1 from '../img/p2.png'
import h2 from '../img/p1.png'
import h3 from '../img/p5.png'
import h4 from '../img/2.jpg'
import h5 from '../img/clockwise.jpg'
import h6 from '../img/friend.jpg'
import h7 from '../img/p3.png'
import h8 from '../img/3.jpg'

import headset from '../img/headphones.gltf'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin  from 'gsap/ScrollToPlugin'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


function Honeycome() {

    useEffect(() => {

        gsap.registerPlugin(ScrollTrigger,ScrollToPlugin)
        console.clear()
        const containers = document.querySelector('.maincontainer')
        const container = document.querySelector('.container')
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.maincontainer',
                start: "top top",
                end:() => `+=${containers.clientHeight * 8}px`,
                pin: true,
                scrub: 2,
                // invalidateOnRefresh:true,
            }
        })

        tl1.to(".sliderMainAbsolute", {
            "clip-path": "polygon(-100% 0%, 100% 0%, 100% 100%, -25% 100%)",
            ease: "none",
            stagger: 1,
            // overwrite:true,
        });

        container.addEventListener("mousemove",(e) => {
            var rect = container.getBoundingClientRect()
            let x = e.clientX - rect.x
            let y = e.clientY - rect.y

            gsap.to('.cursor',{
                x:x,
                y:y,
                ease:"sine.out"
            })
        }) 

        const sliderMains = document.querySelectorAll('.sliderMain')

        const nextBtn = document.querySelector('.next')
        const prevBtn = document.querySelector('.prev')

        let nextprev = 0;

        nextBtn.addEventListener("click",() => {
            nextprev += 1
            gsap.to(window,{
                duration:2,
                scrollTo:{
                    y:container.clientHeight * nextprev
                }
            })

            if(nextprev > sliderMains.length) {
                nextprev = sliderMains.length
            }

        })

        prevBtn.addEventListener("click",() => {
            nextprev -= 1
            gsap.to(window,{
                    duration:2,
                    scrollTo:{
                        y: container.clientHeight * nextprev
                    }
                }
            )
            if(nextprev < 0) {
                nextprev = 0
            }
        })


        const allScenes = document.querySelectorAll('.scene')
        const colorGates = [
            0xDB00FF,
            0xD9C725,
            0x355689,
            0xCA6154,
            0xE4B58D,
            0xE4D18D,
            0xBA2B40,
            0x88bee1,

        ]

        // let starGeo = new THREE.Vector3 ()

        
        allScenes.forEach((elem,i) => {
            let sceneRect = elem
            let scene = new THREE.Scene()
            let fieldOfView = 100,
            aspectRatio = sceneRect.clientWidth / sceneRect.clientHeight,
            near = 0.1,
            far = 1000,
            camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
            let renderer = new THREE.WebGLRenderer({antialias:true,alpha:true})
    
            renderer.setPixelRatio(devicePixelRatio)
            renderer.setSize(sceneRect.clientWidth,sceneRect.clientHeight)
            
            sceneRect.appendChild(renderer.domElement)
    
            let loader = new GLTFLoader();
            var model;
            loader.load(headset,function (gltf) {
                model = gltf.scene 
                scene.add(model)
                renderer.render(scene,camera)
            })
    
            // camera.position.set(0,3,10)
            // camera.lookAt(-2,0,-10)
            camera.position.set(0,2,8)
    
    
            let light = new THREE.PointLight(colorGates[i],2,1000)
            light.position.set(0,20,-20);
            scene.add(light)
    
            let light1 = new THREE.PointLight(colorGates[i],1,1000)
            light1.position.set(0,-20,20);
            scene.add(light1)
        
            const controls = new OrbitControls(camera,renderer.domElement)
            controls.maxPolarAngle = Math.PI / 2;
            controls.minPolarAngle = Math.PI / 2.5;
            controls.maxDistance = 10;
            controls.minDistance = 3;

            renderer.render(scene,camera)

            function animate() {
                // camera.lookAt(-2,0,30)
                // camera.rotation.y += 0.001
                if (model) {
                    model.rotation.y += 0.001
                }
                requestAnimationFrame(animate)
                renderer.render(scene,camera)
            }
            
            animate()

            window.addEventListener("resize",() => {
                let width = sceneRect.clientWidth;
                let height = sceneRect.clientHeight;
                renderer.setSize(width,height)
                camera.aspect = width / height
                camera.updateProjectionMatrix()
            })

        })


    },[])
    
    return (
        <div className='maincontainer'>
            <div className='container'>
                <div className="title">
                    <h3> Honeycomebear </h3>
                    <h3> ハニーカムベア </h3>
                </div>
                <div className="prev">
                    <div className="btnCircle"></div>
                    <svg width="62" height="16" viewBox="0 0 62 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.65685 15.0711L0.292892 8.70716C-0.0976295 8.31664 -0.0976295 7.68347 0.292892 7.29295L6.65685 0.928985C7.04738 0.53846 7.68054 0.53846 8.07107 0.928985C8.46159 1.31951 8.46159 1.95267 8.07107 2.3432L3.41422 7.00005L62 7.00005V9.00005L3.41422 9.00005L8.07107 13.6569C8.46159 14.0474 8.46159 14.6806 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711Z" fill="white"/>
                    </svg>
                </div>
                <div className="next">
                    <div className="btnCircle"></div>
                    <svg width="63" height="16" viewBox="0 0 63 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M56.2782 1.26872L62.6422 7.63268C63.0327 8.02321 63.0327 8.65637 62.6422 9.0469L56.2782 15.4109C55.8877 15.8014 55.2545 15.8014 54.864 15.4109C54.4735 15.0203 54.4735 14.3872 54.864 13.9966L59.5208 9.33979H0.935059V7.33979H59.5208L54.864 2.68294C54.4735 2.29241 54.4735 1.65925 54.864 1.26872C55.2545 0.878199 55.8877 0.878199 56.2782 1.26872Z" fill="white"/>
                    </svg>
                </div>
                <div className="sliderMain">
                    <div className="cursor"></div>
                    <div className="ring Lrg"></div>
                    <div className="ring Med"></div>
                    <div className="play">
                        <a href="https://www.youtube.com/watch?v=XngqpkYJbNs">
                            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                            </svg>
                        </a>
                    </div>
                    <div className="sound">
                        <div className="line line1"></div>
                        <div className="line line2"></div>
                        <div className="line line3"></div>
                        <div className="line line4"></div>
                    </div>
                    <div className="imageCircle">
                        <div className="lrg-circ">
                            <div className="borderCircle"></div>
                            <div className="tp-left"> 
                                <h3>
                                    スニーカー
                                </h3>
                            </div>
                            <div className="tp-right">
                                <h3>
                                    Sneakers
                                </h3>
                            </div>
                            <div className="bt-left">
                                <h3>
                                    スニーカー
                                </h3>
                            </div>
                            <div className="bt-right">
                                <h3>
                                    Sneakers
                                </h3>
                            </div>
                            <div className="med-circ">
                                <div className="borderCircle"></div>
                                <div className="small-circ">
                                    <div className="scene"></div>
                                    <img src={h1} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashBoard"></div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=TqU2ZDFWBco">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        アキレア
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        Achillea
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        アキレア
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        Achillea
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h2} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=PGWXbXvwAgw">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        リボルバー
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        Revolver
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        リボルバー
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        Revolver
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h3} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=M6EzdryDBdM">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        トワイライト
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        Twilight
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        トワイライト
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        Twilight
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h4} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=BQBRO6fjVrM">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        時計回り
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        Clockwise
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        時計回り
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        Clockwise
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h5} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=jGNb318jBu4">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        友達
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        Friend
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        友達
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        Friend
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h6} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=x13D_e46yhs">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        アイドル
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        IDOL
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        アイドル
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        IDOL
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h7} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
                <div className="sliderMainAbsolute">
                    <div className="sliderMain">
                        <div className="cursor"></div>
                        <div className="ring Lrg"></div>
                        <div className="ring Med"></div>
                        <div className="play">
                            <a href="https://www.youtube.com/watch?v=ai2xI7wB3hA">
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.8333 0C9.33333 0 0 9.33333 0 20.8333C0 32.3333 9.33333 41.6667 20.8333 41.6667C32.3333 41.6667 41.6667 32.3333 41.6667 20.8333C41.6667 9.33333 32.3333 0 20.8333 0ZM16.6667 30.2083V11.4583L29.1667 20.8333L16.6667 30.2083Z" fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <div className="sound">
                            <div className="line line1"></div>
                            <div className="line line2"></div>
                            <div className="line line3"></div>
                            <div className="line line4"></div>
                        </div>
                        <div className="imageCircle">
                            <div className="lrg-circ">
                                <div className="borderCircle"></div>
                                <div className="tp-left"> 
                                    <h3>
                                        リメンバー
                                    </h3>
                                </div>
                                <div className="tp-right">
                                    <h3>
                                        Remember
                                    </h3>
                                </div>
                                <div className="bt-left">
                                    <h3>
                                        リメンバー
                                    </h3>
                                </div>
                                <div className="bt-right">
                                    <h3>
                                        Remember
                                    </h3>
                                </div>
                                <div className="med-circ">
                                    <div className="borderCircle"></div>
                                    <div className="small-circ">
                                        <div className="scene"></div>
                                        <img src={h8} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="dashBoard"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Honeycome