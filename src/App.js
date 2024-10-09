import React, { useState, useRef, useEffect, Suspense } from 'react';
import { gsap } from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger'; // Import the ScrollTrigger plugin
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from 'three'
gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isShowLine, setIsShowLine] = useState(false)
  const scrollContainer = useRef()
  const header = useRef()
  const about = useRef()
  const contact = useRef()
  const technology = useRef()
  const aifeature = useRef()
  const solutions = useRef()
  const footer = useRef()
  const mainTitle = useRef()
  const aboutTitle = useRef()
  const predictiveLine = useRef()
  const predictiveLine1 = useRef()
  const predictiveLine2 = useRef()
  const scalabilityLine = useRef()
  const whyCotraxLine = useRef()
  const pauseAutoScroll = useRef(false)
  const WaveShaderMaterial = shaderMaterial(
    // Uniforms
    {
      uTime: 0,
    },
    // Vertex Shader
    `
          varying vec2 vUv;
          uniform float uTime;
      
          void main() {
            vUv = uv;
            vec3 pos = position;
      
            // Apply a simple sine wave deformation
            float frequency = 4.0;
            float amplitude = 0.1;
            pos.z += sin(pos.y * frequency + uTime) * amplitude;
            pos.z += cos(pos.x * frequency + uTime) * amplitude;
      
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
    // Fragment Shader
    `
        varying vec2 vUv;
      
        void main() {
            gl_FragColor = vec4(0.910, 0.678, 0.592, 1.0);  // Color set to #E7AD97
        }
    
        `
  );
  extend({ WaveShaderMaterial });
  const WavyPlane = () => {
    const shaderRef = useRef();

    // Update time for the wave effect
    useFrame(({ clock }) => {
      shaderRef.current.uTime = clock.getElapsedTime();
    });

    return (
      <group rotation={[0, -0.7, 0]}>
        <mesh>
          <planeGeometry args={[5, 5, 12, 12]} /> {/* Plane with more segments */}
          <waveShaderMaterial ref={shaderRef} wireframe={true} />
        </mesh>
      </group >
    );
  };
  const sphereRef = useRef()
  const SphereComponent = function () {
    console.log("SphereComponent")
    useFrame(() => {
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.003; // Rotate on Y-axis
      }
    });
    return (
      <group ref={sphereRef}>
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1, 16, 32]} />
          <meshBasicMaterial transparent opacity={0.2} wireframe={false} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.SphereGeometry(1, 16, 32)]} />
          <lineBasicMaterial color="#C66E22" />
        </lineSegments>
      </group>
    )
  }
  const goTo = (element) => {
    if (element.current) {
      pauseAutoScroll.current = true
      console.log(pauseAutoScroll.current)
      element.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        pauseAutoScroll.current = false
      }, 1000);
    } else {
      console.warn("Element reference is null");
    }
  }
  const GreenLin = ({ time, start, color }) => {
    return (
      <div className='flex flex-col justify-between h-screen'>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`green-line animate-blink`} style={{ backgroundColor: color, animationDelay: `${(25 + start - i) * time}s` }} />
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`green-line animate-blink`} style={{ backgroundColor: color, animationDelay: `${(25 + start - i) * time}s` }} />
        ))}
      </div>
    )
  }
  const GreenLine1 = ({ time, start, color }) => {
    return (
      <div className='flex flex-col justify-between h-screen'>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`green-line animate-blink`} style={{ backgroundColor: color, animationDelay: `${(i + start) * time}s` }} />
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`green-line animate-blink`} style={{ backgroundColor: color, animationDelay: `${(i + start) * time}s` }} />
        ))}
      </div>
    )
  }
  const GreenLine2 = ({ time, start, color }) => {
    return (
      <div className='flex justify-between w-[98vw]'>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`w-[4%] h-[6px] opacity-0 animate-blink`} style={{ backgroundColor: color, animationDelay: `${(25 + start - i) * time}s` }} />
        ))}
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`w-[4%] h-[6px] opacity-0 animate-blink`} style={{ backgroundColor: color, animationDelay: `${(25 + start - i) * time}s` }} />
        ))}
      </div>
    )
  }
  useEffect(() => {
    gsap.fromTo(
      aboutTitle.current,
      { xPercent: -100 },  // Start with opacity 0 (faded out)
      {
        xPercent: 0,    // Fade in to opacity 1
        scrollTrigger: {
          trigger: aboutTitle.current,
          start: "top center", // Start fading in when the top of aboutSection reaches the center of the viewport
          end: "bottom center", // Start fading out when the bottom of aboutSection reaches the center of the viewport
          scrub: 1, // Smooth transition
        },
        duration: 3, // Duration of the animation
        ease: "power1.inOut", // Smooth ease effect for fade in and fade out
      }
    );
    gsap.fromTo(
      whyCotraxLine.current,
      { xPercent: -100 },  // Start with opacity 0 (faded out)
      {
        xPercent: 0,    // Fade in to opacity 1
        scrollTrigger: {
          trigger: whyCotraxLine.current,
          start: "top center", // Start fading in when the top of aboutSection reaches the center of the viewport
          end: "bottom center", // Start fading out when the bottom of aboutSection reaches the center of the viewport
          scrub: 1, // Smooth transition
        },
        duration: 3, // Duration of the animation
        ease: "power1.inOut", // Smooth ease effect for fade in and fade out
      }
    );
    gsap.fromTo(
      scalabilityLine.current,
      { xPercent: -300 },  // Start with opacity 0 (faded out)
      {
        xPercent: 0,    // Fade in to opacity 1
        scrollTrigger: {
          trigger: scalabilityLine.current,
          start: "top center", // Start fading in when the top of aboutSection reaches the center of the viewport
          end: "bottom center", // Start fading out when the bottom of aboutSection reaches the center of the viewport
          scrub: 1, // Smooth transition
        },
        duration: 3, // Duration of the animation
        ease: "power1.inOut", // Smooth ease effect for fade in and fade out
      }
    );
    gsap.fromTo(
      predictiveLine1.current,
      { xPercent: -600 },  // Start with opacity 0 (faded out)
      {
        xPercent: 0,    // Fade in to opacity 1
        scrollTrigger: {
          trigger: predictiveLine1.current,
          start: "top center", // Start fading in when the top of aboutSection reaches the center of the viewport
          end: "bottom center", // Start fading out when the bottom of aboutSection reaches the center of the viewport
          scrub: 1, // Smooth transition
        },
        duration: 2, // Duration of the animation
        ease: "power1.inOut", // Smooth ease effect for fade in and fade out
      }
    );
    gsap.fromTo(
      predictiveLine2.current,
      { xPercent: -600 },  // Start with opacity 0 (faded out)
      {
        xPercent: 0,    // Fade in to opacity 1
        scrollTrigger: {
          trigger: predictiveLine2.current,
          start: "top center", // Start fading in when the top of aboutSection reaches the center of the viewport
          end: "bottom center", // Start fading out when the bottom of aboutSection reaches the center of the viewport
          scrub: 1, // Smooth transition
        },
        duration: 3, // Duration of the animation
        ease: "power1.inOut", // Smooth ease effect for fade in and fade out
      }
    );
    setIsShowLine(true)
  }, [])
  const [isShowModal, setIsShowModal] = useState(false)
  const scrollContainerRef = useRef(null);
  const scrollSpeed = 1; // Base scroll speed
  useEffect(() => {
    setTimeout(() => {
      const scrollContainer = scrollContainerRef.current;
      const autoScroll = () => {
        if (!pauseAutoScroll.current && scrollContainer) {
          scrollContainer.scrollLeft += scrollSpeed;
          // Check if we've scrolled past the content width
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            // Reset scroll position to the start (before the duplicate content)
            scrollContainer.scrollLeft = 0;
          }
        }
        requestAnimationFrame(autoScroll);
      };
      requestAnimationFrame(autoScroll);
    }, 1000);
  }, [scrollSpeed, pauseAutoScroll]);

  return (
    <div className='w-full h-screen sm:min-h-[800px]' ref={scrollContainer}>
      <div className='w-full h-screen text-white bg-[#212121] sm:min-h-[800px]' id='header' ref={header}>
        <div className='absolute flex items-center justify-center top-[15%]'>
          <div className='w-[80%] overflow-hidden'>
            <GreenLine2 time={0.2} start={8} color={'#91AAE6'} />
          </div>
        </div>
        <div className='absolute flex items-center justify-end overflow-hidden top-[25%] right-[10%]'>
          <div className='w-[80%] overflow-hidden'>
            <GreenLine2 time={0.2} start={1} color={'blue'} />
          </div>
        </div>
        <div className='absolute flex items-center justify-end bottom-[25%] right-[10%]'>
          <div className='w-[80%] overflow-hidden'>
            <GreenLine2 time={0.2} start={3} color={'blue'} />
          </div>
        </div>
        <div className='absolute flex items-center justify-end bottom-[15%] right-[20%]'>
          <div className='w-[20%] overflow-hidden'>
            <GreenLine2 time={0.2} start={4} color={'blue'} />
          </div>
        </div>
        <div className='absolute flex flex-col items-center justify-center h-full left-[9%]'>
          <div className='h-[50%] overflow-hidden'>
            <GreenLin time={0.2} start={5} color={'blue'} />
          </div>
        </div>
        <div className='absolute flex flex-col items-center justify-center h-full right-[10%]'>
          <div className='h-[50%] overflow-hidden'>
            <GreenLin time={0.2} start={10} color={'#91AAE6'} />
          </div>
        </div>
        <div className='absolute flex flex-col items-center justify-center h-full right-[20%]'>
          <div className='h-[70%] overflow-hidden'>
            <GreenLine1 time={0.2} start={4} color={'blue'} />
          </div>
        </div>
        <div className='w-full h-[10%] flex justify-between px-[5%] items-center p-10 z-10'>
          <div className='text-[20px] sm:text-[28px]' style={{ fontFamily: "Whyte Inktrap" }}>
            COTRA<span className='text-[#2667FF]'>X.</span>io
          </div>
          <div className='flex justify-between'>
            <div className='rounded flex justify-center cursor-pointer items-center text-[14px] sm:text-[18px] sm:h-[56px] h-[40px] sm:w-[201px] w-[145px] sm:mr-5 mr-4 text-white bg-[#212121 ] border border-white hover:bg-[#2667FF]' onClick={() => {
              goTo(solutions)
            }}>
              Partner with us
              <img src='/landing/arrow-right.png' className='w-4 h-4 ml-1 sm:ml-2 sm:w-6 sm:h-6' alt='' />
            </div>
            <div className='rounded  sm:text-black static sm:z-[70] z-10 text-white cursor-pointer sm:bg-white bg-[#212121] min-w-fit sm:h-[56px] h-[40px] w-9 sm:w-[116px] text-[14px] sm:text-[18px] flex justify-around items-center sm:border-black border-white border' onClick={() => setIsShowModal(!isShowModal)} onMouseOver={() => { setIsShowModal(isShowModal) }}>
              <div className='items-center justify-around hidden sm:flex'>
                <div className='mr-[5px]'>
                  {isShowModal ? 'Close' : 'Menu'}
                </div>
                <div>
                  {isShowModal ? <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" transform="matrix(0 -1 -1 0 4 14)" fill="#212121" />
                    <rect width="4" height="4" transform="matrix(0 -1 -1 0 4 4)" fill="#212121" />
                  </svg>
                    : <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="4" height="4" transform="matrix(-1 0 0 1 14 0)" fill="#212121" />
                      <rect width="4" height="4" transform="matrix(-1 0 0 1 4 0)" fill="#212121" />
                    </svg>
                  }
                </div>
              </div>
              <img className="block sm:hidden w-[14px]" src='/landing/Group 30.png' alt='' />
            </div>
          </div>
        </div>
        <div className='w-full h-[80%] flex justify-center items-center z-50 relative'>
          <div className='sm:text-[64px] text-[32px] text-center' id='mainTitle' ref={mainTitle}>
            <p className='hidden font-bold sm:block '>
              Transform Anything into the<br />Internet of Things(IoT)
            </p>
            <p className='block sm:hidden'>
              Transform any "thing"<br />to Internet of "Things"<br />(IoT)
            </p>
          </div>
        </div>
        <div className='w-full h-[10%] flex justify-center items-center pb-10'>
          <div className='p-3 text-center text-white border border-white rounded cursor-pointer' onClick={() => {
            goTo(about)
          }}><img src='/landing/arrow-bottom.png' className='w-6 h-6' alt='' /></div>
        </div>
        {isShowModal && (
          <div className='w-screen h-screen sm:static fixed z-[60] right-0 bg-black/50 top-0'>
            <div onMouseLeave={() => {
              setIsShowModal(false)
            }} onMouseOver={() => { setIsShowModal(true) }} className='absolute z-[60] top-0 right-0 h-[12%] w-[200px] mx-[5%]'>
            </div>
            <div onMouseLeave={() => {
              setIsShowModal(false)
            }} onMouseOver={() => { setIsShowModal(true) }} className='absolute z-[60] sm:top-[12%] top-[2%] right-0 mx-[5%] bg-white sm:w-[738px] sm:h-[889px] w-[90%] h-[95%] sm:text-[40px] text-[32px] sm:font-bold text-[#212121] flex sm:justify-center justify-start sm:flex-row flex-col'>
              <div className='sm:hidden flex items-center justify-between w-[90%] mx-[23px] mt-5'>
                <div className='text-[20px] font-bold' style={{ fontFamily: "Whyte Inktrap" }}>
                  COTRA<span className='text-[#2667FF]'>X.</span>io
                </div>
                <div className='cursor-pointer flex items-center justify-center h-10 w-9 border border-[#212121]' onClick={() => { setIsShowModal(false) }}>
                  <img className="w-6 h-6" src='/landing/add.png' alt='' />
                </div>
              </div>
              <div className='flex flex-col sm:items-center items-start sm:justify-between justify-start cursor-pointer h-1/2 sm:mt-[140px] sm:mx-0 mx-[23px] mt-[40px]'>
                <div className='hover:text-[#2667FF] text-center h-12 mt-[15px] text-[#2667FF]' onClick={() => {
                  setIsShowModal(false)
                }}>Home</div>
                <div className='hover:text-[#2667FF] text-center h-12 mt-[15px]' onClick={() => {
                  goTo(about)
                  setIsShowModal(false)
                }}>About Us</div>
                <div className='hover:text-[#2667FF] text-center h-12 mt-[15px]' onClick={() => {
                  setIsShowModal(false)
                }}>Technology</div>
                <div className='hover:text-[#2667FF] text-center h-12 mt-[15px]' onClick={() => {
                  goTo(solutions)
                  setIsShowModal(false)
                }}>Solutions</div>
                <div className='hover:text-[#2667FF] text-center h-12 mt-[15px]' onClick={() => {
                  goTo(contact)
                  setIsShowModal(false)
                }}>Contacts</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='sm:p-16 p-6 flex items-center justify-center w-full sm:h-screen h-fit bg-white sm:min-h-[800px]' ref={about} id='about'>
        <div className='flex flex-col items-center justify-around w-full h-full sm:flex-row'>
          <div className='sm:w-[60%] w-full h-[60%] sm:h-full'>
            <div className='sm:mt-[14%] mt-[20%] text-[18px] sm:text-[22px]' ref={aboutTitle}>
              Elevate Your Asset Management
            </div>
            <div className='sm:text-[64px] text-[28px] font-bold sm:mt-[4%] mt-[5%]' id="section">
              <div className='max-h-full overflow-hidden tracking-[-0.03em] duration-1000 transition-height leading-tight'>
                <p>AI-Driven Precision for<br />Real-Time Asset<br />Tracking Across<br />Industries</p>
              </div>
            </div>
            <div className='sm:mt-[4%] mt-[7%] text-[18px] sm:text-[22px]'>
              Seamless Integration of <span className='text-[#2667FF] font-bold'>BLE</span>, <span className='text-[#2667FF] font-bold'>UWB</span>, and <span className='text-[#2667FF] font-bold'>Next-Gen Technology</span> on a Scalable, <span className='text-[#2667FF] font-bold'>Cloud-Based SaaS</span> Platform.
            </div>
            <div className='sm:mt-[6%] flex items-center justify-start mt-[9%]'>
              <div className='rounded flex justify-center items-center sm:text-[18px] text-[14px] sm:h-[56px] h-[48px] sm:w-[201px] sm:min-w-[201px] w-[145px] min-w-[145px] sm:mr-5 mr-4 text-white bg-[#212121] border border-white hover:bg-[#2667FF]  cursor-pointer' onClick={() => {
                goTo(solutions)
              }}>
                Partner with us
                <img src='/landing/arrow-right.png' className='w-4 h-4 ml-1 sm:w-6 sm:h-6 sm:ml-2' alt='' />
              </div>
              <div className='rounded text-black border-black border bg-white sm:h-[56px] h-[48px] sm:w-[201px] sm:min-w-[201px] w-[130px] min-w-[130px] sm:text-[18px] text-[14px] flex justify-center items-center hover:bg-[#2667FF] hover:text-white cursor-pointer' onClick={() => {
                goTo(technology)
              }}>
                Learn more
                <img src='/landing/arrow-right_black.png' className='w-4 h-4 ml-1 sm:w-6 sm:h-6 sm:ml-2' alt='' />
              </div>
            </div>
          </div>
          <div className='w-[400px] h-[400px] items-center justify-center flex'>
            <Canvas
              camera={{ position: [0, 0, 25], fov: 75, zoom: 10 }} className='w-full h-full' id="map-canvas">
              `                         <Suspense>
                <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} rotateSpeed={0.2} panSpeed={0.2} mouseButtons={{
                  LEFT: THREE.MOUSE.PAN,
                  MIDDLE: THREE.MOUSE.DOLLY,
                  RIGHT: THREE.MOUSE.ROTATE
                }} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <SphereComponent />
              </Suspense>`
            </Canvas>
          </div>
        </div>
      </div>
      <div className='w-full bg-white' id='technology' ref={technology}>
        <div className='text-center sm:my-[64px] my-[40px] sm:text-[24px] text-[18px] sm:pt-[5%]'>
          Adapting to Any Industry, Any Scale
        </div>
        <div className='sm:h-[90px] h-[56px] w-full bg-[#2667FF] text-white flex sm:justify-around justify-between items-center overflow-hidden' ref={scrollContainerRef} style={{ overflow: "hidden" }}>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Logistics and Supply chain
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Healthcare
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Manufacturing
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Construction
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Retail
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Logistics and Supply chain
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Healthcare
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Manufacturing
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Construction
          </div>
          <div className='sm:min-w-[400px] min-w-[200px] text-center sm:text-[28px] text-[18px] whitespace-nowrap'>
            Retail
          </div>
        </div>
        <div className='w-full flex flex-col justify-between items-center sm:my-[164px] my-[80px]'>
          <div className='flex items-center justify-around w-full h-full overflow-x-auto'>
            <div className='rounded mx-5 min-w-[200px] min-h-[300px] sm:min-w-[300px] sm:min-h-[350px] sm:w-[300px] w-[200px] sm:h-[350px] h-[300px] border border-[#D7D7D7] justify-between sm:p-8 p-5 flex flex-col items-center'>
              <div className='sm:h-[50%] h-[30%]  flex items-center justify-center'>
                <img className='w-16 h-16' src='/landing/cloud-connection.png' alt='' />
              </div>
              <div className='sm:h-[50%] h-[70%]'>
                <div className='font-bold sm:text-[20px] text-[18px]'>
                  Cloud-Powered PaaS
                </div>
                <div className='sm:text-[18px] text-[16px] opacity-70'>
                  Offering scalable, multi-technology support across vrious hardware
                </div>
              </div>
            </div>
            <div className='rounded mx-5 min-w-[200px] min-h-[300px] sm:min-w-[300px] sm:min-h-[350px] sm:w-[300px] w-[200px] sm:h-[350px] h-[300px] border border-[#D7D7D7] justify-between sm:p-8 p-5 flex flex-col items-center'>
              <div className='sm:h-[50%] h-[30%] flex items-center justify-center'>
                <img className='w-16 h-16' src='/landing/like-dislike.png' alt='' />
              </div>
              <div className='sm:h-[50%] h-[70%]'>
                <div className='font-bold  sm:text-[20px] text-[18px]'>
                  Seamless Integration
                </div>
                <div className='sm:text-[18px] text-[16px] opacity-70'>
                  Plug-and-play solutions for BLE, UWB, and future loT technologies
                </div>
              </div>
            </div>
            <div className='rounded mx-5 min-w-[200px] min-h-[300px] sm:min-w-[300px] sm:min-h-[350px] sm:w-[300px] w-[200px] sm:h-[350px] h-[300px] border border-[#D7D7D7] justify-between sm:p-8 p-5 flex flex-col items-center'>
              <div className='sm:h-[50%] h-[30%]  flex items-center justify-center'>
                <img className='w-16 h-16' src='/landing/programming-arrow.png' alt='' />
              </div>
              <div className='sm:h-[50%] h-[70%]'>
                <div className='font-bold  sm:text-[20px] text-[18px]'>
                  AI-Driven Calculation Engine
                </div>
                <div className='sm:text-[18px] text-[16px] opacity-70'>
                  Real-time procesing for asset tracking even in high-noise environments such as factories
                </div>
              </div>
            </div>
            <div className='rounded mx-5 min-w-[200px] min-h-[300px] sm:min-w-[300px] sm:min-h-[350px] sm:w-[300px] w-[200px] sm:h-[350px] h-[300px] border border-[#D7D7D7] justify-between sm:p-8 p-5 flex flex-col items-center'>
              <div className='sm:h-[50%] h-[30%]  flex items-center justify-center'>
                <img className='w-16 h-16' src='/landing/radar-2.png' alt='' />
              </div>
              <div className='sm:h-[50%] h-[70%]'>
                <div className='font-bold sm:text-[20px] text-[18px]'>
                  Enterprise-Grade Precision
                </div>
                <div className='sm:text-[18px] text-[16px] opacity-70'>
                  Accuracy as close as 1-cm, adaptable to high-interference zones
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='sm:w-[50%] w-full sm:h-[90%] sm:px-16 px-8 mt-[20%]'>
          <div className='sm:text-[22px] text-[18px]' ref={whyCotraxLine}>
            Why Cotrax.io?
          </div>
          <div className='sm:text-[64px] text-[32px] font-bold sm:my-[40px] my-[24px] leading-tight'>
            A Platform That Grows With Your Business
          </div>
          <div className='sm:text-[22px] text-[18px] opacity-70'>
            With <strong>Cotrax.io</strong> you <strong>Future-Proof</strong> Your Business
          </div>
        </div>
        <div className='flex justify-center w-full px-8 mt-20 sm:justify-end sm:mt-0'>
          <div className='w-full sm:w-1/2'>
            <div className='sm:text-[32px] text-[20px] font-bold max-h-[90px] overflow-hidden sm:mb-[40px] mb-9' ref={scalabilityLine}>
              Scalability . Cloud-First Architechture . Multi-Environment Capabilities
            </div>
            <div className='sm:text-[22px] text-[18px] sm:mb-[164px] mb-20'>
              <div>
                <p>
                  <span className='text-[#2667FF] font-bold'>Scalability</span> at the Core Whether you need a small installation for a factory or a large deployment across multiple industrial zones, Cotrax.io is built to scale effortlessly with your requirements.
                </p>
                <p>
                  <span className='text-[#2667FF] font-bold'>Cloud-First architecture</span> As a Platform as a Service (PaaS), Cotrax.io eliminates the need for costly local infrastructure, providing a highly flexible, modular, and customizable platform.
                </p>
                <p>
                  <span className='text-[#2667FF] font-bold'>Multi-Environment capabilities</span> Our platform thrives in challenging environments, from factories with high RF interference to hospitals with dense networks. With our noise-canceling algorithms and AI precision, Cotrax.io offers reliable, real-time data processing for asset tracking even in the toughest conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center w-full h-screen text-white bg-[#212121] sm:min-h-[800px]' id='aifeature' ref={aifeature}>
        <div className={`w-full h-screen absolute z-0 ${isShowLine ? 'opacity-100' : 'opacity-0'}`}>
          <div className='absolute z-50 flex items-center justify-center top-[10%]'>
            <div className='w-[80%] overflow-hidden'>
              <GreenLine2 time={0.1} start={1} color={'#91AAE6'} />
            </div>
          </div>
          {/* top 2nd line */}
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[20%] right-[20%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={6} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[20%] right-[40%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={12} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[20%] right-[60%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={6} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[20%] right-[80%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={12} color={'blue'} />
            </div>
          </div>
          {/* top 3rd line */}
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[30%] right-[10%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={3} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[30%] right-[30%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={9} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[30%] right-[50%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={3} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end overflow-hidden top-[30%] right-[70%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={9} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-center h-full left-[9%]'>
            <div className='h-[60%] overflow-hidden'>
              <GreenLin time={0.2} start={1} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-center h-full right-[10%]'>
            <div className='h-[80%] overflow-hidden'>
              <GreenLine1 time={0.2} start={1} color={'blue'} />
            </div>
          </div>
          {/* 2nd bottom line with 10% seperate */}
          <div className='absolute z-50 flex items-center justify-end bottom-[20%] right-[10%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={1.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end bottom-[20%] right-[30%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={6} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end bottom-[20%] right-[50%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={1.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end bottom-[20%] right-[70%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={6} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end bottom-[10%] right-[10%]'>
            <div className='w-[80%] overflow-hidden'>
              <GreenLine2 time={0.2} start={10} color={'blue'} />
            </div>
          </div>
          {/* 3rd bottom line with 10% seperate */}
          <div className='absolute z-50 flex items-center justify-end bottom-[30%] right-[40%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={10} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end bottom-[30%] right-[80%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={10} color={'blue'} />
            </div>
          </div>
          {/* 4th botton line with 10% seperator */}
          <div className='absolute z-50 flex items-center justify-end bottom-[40%] right-[20%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={4.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute z-50 flex items-center justify-end bottom-[40%] right-[60%]'>
            <div className='w-[10%] overflow-hidden'>
              <GreenLine2 time={0.2} start={4.5} color={'blue'} />
            </div>
          </div>
          {/* bottom line */}
          <div className='absolute flex flex-col items-center justify-end h-full right-[20%] bottom-[20%]'>
            <div className='h-[20%] overflow-hidden'>
              <GreenLin time={0.2} start={3} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-end h-full right-[30%] bottom-[20%]'>
            <div className='h-[20%] overflow-hidden'>
              <GreenLine1 time={0.2} start={12} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-end h-full right-[40%] bottom-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLin time={0.2} start={9} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-end h-full right-[50%] bottom-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLine1 time={0.2} start={7.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-end h-full right-[60%] bottom-[20%]'>
            <div className='h-[20%] overflow-hidden'>
              <GreenLin time={0.2} start={3} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-end h-full right-[70%] bottom-[20%] '>
            <div className='h-[20%] overflow-hidden'>
              <GreenLine1 time={0.2} start={12} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-end h-full right-[80%] bottom-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLin time={0.2} start={9} color={'blue'} />
            </div>
          </div>
          {/* top lines */}
          <div className='absolute flex flex-col items-center justify-start h-full right-[20%] top-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLin time={0.2} start={4.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-start h-full right-[30%] top-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLine1 time={0.2} start={1.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-start h-full right-[40%] top-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLin time={0.2} start={10.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-start h-full right-[50%] top-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLine1 time={0.2} start={7.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-start h-full right-[60%] top-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLin time={0.2} start={4.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-start h-full right-[70%] top-[20%] '>
            <div className='h-[10%] overflow-hidden'>
              <GreenLine1 time={0.2} start={1.5} color={'blue'} />
            </div>
          </div>
          <div className='absolute flex flex-col items-center justify-start h-full right-[80%] top-[20%]'>
            <div className='h-[10%] overflow-hidden'>
              <GreenLin time={0.2} start={10.5} color={'blue'} />
            </div>
          </div>
        </div>
        <div className='z-50 w-full'>
          <div className='sm:text-[64px] text-[32px] font-bold text-center w-full z-50'>AI-Powered Tracking Engine</div>
        </div>
      </div>
      <div className='sm:h-screen md:h-fit h-fit pb-10 px-5 text-white bg-[#212121] min-h-[60vw]' id='solutions' ref={solutions}>
        <div className='sm:text-[64px] text-[32px] w-full sm:pt-[6%] pt-[8%] sm:px-[64px] font-bold'>Our AI Engine Sets Us Apart</div>
        <div className='sm:text-[22px] text-[18px] w-full sm:px-[64px] sm:pt-[3%] pt-[48px] opacity-70 sm:'>The Cotrax.io AI Engine processes millions of data points every second, calculating precise asset locations <br />and optimizing workflows across multiple industries.</div>
        <div className='flex justify-around items-center sm:flex-row flex-col sm:py-[8%]'>
          <div className='flex justify-center items-center sm:w-[232px] sm:h-[428px] w-[142px] h-[264px]'>
            <Canvas
              camera={{ position: [0, 0, 10], fov: 75, zoom: 1.6 }}
              className='sm:w-[232px] sm:h-[428px] w-[142px] h-[264px]' id="map-canvas">
              <color attach="background" args={["#212121"]} />
              <Suspense>
                <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} rotateSpeed={0.2} panSpeed={0.2} mouseButtons={{
                  LEFT: THREE.MOUSE.PAN,
                  MIDDLE: THREE.MOUSE.DOLLY,
                  RIGHT: THREE.MOUSE.ROTATE
                }} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <WavyPlane />
              </Suspense>
            </Canvas>
          </div>
          <div className='sm:w-[40%] w-full'>
            <div>
              <div className='sm:text-[32px] text-[18px] font-bold flex justify-start' ref={predictiveLine}>
                <p ref={predictiveLine1} className='text-[blue]'>Predictive</p>&nbsp;<p ref={predictiveLine2}>asset movement</p>
              </div>
              <div className='sm:text-[22px] text-[16px] sm:mt-4 mt-4 sm:w-full w-[75%] opacity-70'>
                Our AI learns from the environment and asset behavior to predict movements, ensuring that resources are allocated optimally.
              </div>
            </div>
            <div className='flex justify-end w-full mt-[20%] sm:mt-10 sm:justify-start'>
              <div className='rounded sm:p-3 p-1 sm:h-[48px] sm:w-[74px] h-10 w-16 mr-4 text-center text-white flex justify-center items-center border-white border cursor-pointer hover:text-[blue]' onClick={() => {
                goTo(aifeature)
              }}><img src='/landing/arrow-left.png' className='w-6 h-6' alt='' /></div>
              <div className='rounded sm:p-3 p-1 sm:h-[48px] sm:w-[74px] h-10 w-16 flex justify-center items-center text-white border-white border cursor-pointer hover:text-[blue]' onClick={() => {
                goTo(contact)
              }}><img src='/landing/arrow-right.png' className='w-6 h-6' alt='' /></div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-around w-full sm:h-screen h-fit py-20 px-6 sm:px-20 bg-white sm:min-h-[800px]' id='contact' ref={contact}>
        <div className='sm:h-[80%] h-[233] w-full flex flex-col justify-around'>
          <div className='text-[20px] w-full text-[#212121]'>
            Get in touch
          </div>
          <div className='sm:text-[64px] text-[32px] w-full font-bold text-[#212121] tracking-tighter mt-8'>
            <p>Ready to Tackle the<br />Future of Asset Tracking<br />Together?</p>
          </div>
          <div className='w-full mt-12'>
            <div className='rounded text-white  cursor-pointer bg-[#212121] border-black border min-w-fit h-[48px] w-[161px] text-[18px] flex justify-center items-center hover:text-[blue]' onClick={() => {
              goTo(contact)
            }}>
              Contact Us
              <img src='/landing/arrow-right.png' className='w-4 h-4 ml-1 sm:w-6 sm:h-6 sm:ml-2' alt='' />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-between w-full h-screen sm:px-10 px-4 text-white bg-[#212121] sm:min-h-[800px]' id='footer' ref={footer}>
        <div className='flex flex-col h-[80%] sm-[70%] justify-between'>
          <div className='w-full h-[10%] justify-between flex items-center flex-col-reverse mt-10'>
            <div>
              <div className='rounded p-3 flex justify-center items-center text-center text-white border border-white cursor-pointer hover:text-[blue]' onClick={() => {
                goTo(header)
              }}><img src='/landing/arrow-top.png' className='w-8 h-8 sm:w-6 sm:h-6' alt='' /></div>
            </div>
          </div>
          <div className='sm:text-[30px] text-[20px] cursor-pointer '>
            <div className='hover:text-[blue] w-fit' onClick={() => {
              goTo(about)
            }}>About</div>
            <div className='hover:text-[blue] w-fit my-6 sm:my-5' onClick={() => {
              goTo(technology)
            }}>Technology</div>
            <div className='hover:text-[blue] w-fit my-6 sm:my-5' onClick={() => {
              goTo(solutions)
            }}>Solutions</div>
            <div className='hover:text-[blue] w-fit my-6 sm:my-5' onClick={() => {
              goTo(contact)
            }}>Contact Us</div>
          </div>
          <div className='sm:text-[24px] text-[18px] opacity-70'>
            2024 Cotrax
          </div>
        </div>
        <div className='flex items-center justify-start sm:justify-center'>
          <div className='sm:text-[13vw] text-[17vw]' style={{ fontFamily: "Whyte Inktrap", lineHeight: "normal" }}>
            COTRA<span className='text-[blue]'>X</span>.io
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
