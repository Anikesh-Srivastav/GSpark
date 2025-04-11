import { useRef, useState, useEffect } from 'react'
import { TiLocationArrow } from "react-icons/ti";
import Button from '../common/Button';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

function Hero() {

    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isloading, setIsloading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);
    const backgroundRefs = useRef([]);
    const currentMiniRef = useRef(null);

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniClicks = () => {
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    };

    useEffect(() => {
      if(loadedVideos === totalVideos)
        setIsloading(false)
    },[loadedVideos])
    

    // Animate only the #next-video, leave background untouched
    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-video", { visibility: "visible" });
            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => nextVideoRef.current?.play(),
            });
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius: '0 0 40% 10%'
        })
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0 0 0 0',
            ease : 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            }
        })
    })
 

    return (
        
        <div className='relative h-dvh w-screen overflow-x-hidden'>

{isloading && (
    <div className='flex-center fixed inset-0 z-[100] bg-violet-50 overflow-hidden'>
        <div className='three-body'>
            <div className='three-body__dot' />
            <div className='three-body__dot' />
            <div className='three-body__dot' />
        </div>
    </div>
)}


            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                {/* All videos are preloaded in background but only current is shown */}
                {Array.from({ length: totalVideos }).map((_, i) => {
                    const index = i + 1;
                    return (
                        <video
                            key={index}
                            ref={el => backgroundRefs.current[index] = el}
                            src={getVideoSrc(index)}
                            autoPlay
                            loop
                            muted
                            onLoadedData={handleVideoLoad}
                            className={`absolute left-0 top-0 size-full object-cover object-center transition-opacity duration-500 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        />
                    );
                })}

                {/* Mini mask preview */}
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                    <div onClick={handleMiniClicks} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                        <video
                            ref={currentMiniRef}
                            src={getVideoSrc(upcomingVideoIndex)}
                            loop
                            muted
                            id='current-video'
                            className='size-64 origin-center scale-150 object-cover object-center'
                            onLoadedData={handleVideoLoad}
                        />
                    </div>
                </div>

                {/* Animated expanding video */}
                <video
                    ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}
                    loop
                    muted
                    id='next-video'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handleVideoLoad}
                />

                {/* Hero text content */}
                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            redi<b>n</b>e
                        </h1>
                        <p className='mb-5 max-w-64 font-rober-regular text-blue-100'>
                            Enter the MetaGame Layer <br /> Unleash the Play Economy
                        </p>

                        <Button
                            id='watch-trailer'
                            title='Watch Trailer'
                            leftIcon={<TiLocationArrow />}
                            containerClass="!bg-yellow-300 flex-center gap-1"
                        />
                    </div>
                </div>
            </div>

            {/* duplicate text */}
            <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
        </div>
    );
}

export default Hero;