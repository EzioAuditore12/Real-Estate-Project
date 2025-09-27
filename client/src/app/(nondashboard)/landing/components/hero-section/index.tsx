"use client";

import {motion} from "motion/react"
import { HeroBackground } from "./background";
import { HeroTitle } from "./title";
import { HeroSearchBar } from "./search-bar";

export function HeroSection(){
    return(
        <div className="relative h-screen">
            <HeroBackground/>

            <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
            >
                <div  className="max-w-4xl mx-auto px-16 sm:px-12">
                   
                   <HeroTitle/>
                   <HeroSearchBar/>
                    
                </div>
            </motion.div>
        </div>
    )
}