import Image from "next/image"

export function HeroBackground(){
    return(
        <>
         <Image
                    src={"/landing-splash.jpg"}
                    alt="Rentiful Hero Section"
                    fill
                    className="object-cover object-center"
                    priority
                    />
        
                    <div className="absolute inset-0 bg-black/60"/> 
        </>
    )
}