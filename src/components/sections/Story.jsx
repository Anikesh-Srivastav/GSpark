import { useRef } from 'react'
import AnimatedTitle from '../common/AnimatedTitle'
import gsap from 'gsap'
import RoundedCorners from '../common/RoundedCorners'
import Button from '../common/Button'
import { TiLocationArrow } from 'react-icons/ti'

function Story() {

    const frameRef = useRef(null)

    const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const element = frameRef.current;
    
        if (!element) return;
    
        const rect = element.getBoundingClientRect();
        const xPos = clientX - rect.left;
        const yPos = clientY - rect.top;
    
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
    
        const rotateX = ((yPos - centerY) / centerY) * -10;
        const rotateY = ((xPos - centerX) / centerX) * 10;
    
        gsap.to(element, {
          duration: 0.3,
          rotateX,
          rotateY,
          transformPerspective: 500,
          ease: "power1.inOut",
        });
      };
  return (
    <div id="story" className=" min-h-dvh w-screen bg-black
    text-blue-50">
        <div className=" flex size-full flex-col items-center py-10 pb-20">
            <p className="font-general
            text-sm uppercase md:text-[10px]">The Multiverse</p>

            <div className=" relative size-full">
                <AnimatedTitle
                 title='The st<b>o</b>ry of <br /> a hidden real<b>m</b>'
                 sectionId = '#story'
                 containerClass=' mt-5 pointer-events-none
                 mix-blend-difference relative z-10'
                 />
                 <div className=' story-img-container'>
                    <div className=' story-img-mask'>
                        <div className=' story-img-content'>
                            <img
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseLeave}
                            onMouseEnter={handleMouseLeave}
                            onMouseMove={handleMouseMove}
                            ref={frameRef}
                             src="/img/entrance.png"
                             alt="Story" 
                             className=' object-contain'/>
                        </div>
                    </div>
                    <RoundedCorners />
                </div>
            </div>
            <div className="-mt-80 flex w-full justify-center md:-mt-90 md:me-80 md:justify-end">
              <div className=' flex h-full w-fit flex-col items-center md:items-start'>
              <p className=' mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start 
              '>Where realms converge, lies Zentry and the boundless pillar. Discover its secrets and shape your fate amidst infinite opportunities.</p>
              </div>
              </div>
         </div> 
       </div>
   
  )
}

export default Story