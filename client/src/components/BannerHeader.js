import React from 'react'
import { motion } from 'framer-motion';
export default function BannerHeader() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <section style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/homebg.jpg)` }} className='min-h-[500px] bg-no-repeat bg-cover bg-center relative -z-10'>
                <div className='text-center mx-auto w-9/12 absolute top-[17%] xl:top-[17%] lg:top-[25%] right-1/2 translate-x-1/2 translate-y-1/2'>
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className='text-3xl xl:text-5xl lg:text-5xl font-bold text-white'>RMUTP LOST NOTIFICATION SYSTEM</h1>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className='mt-4 text-white text-lg hidden xl:block lg:block'>พันธุวิศวกรรมมหภาคพันธุวิศวกรรมซากุระแมมโบ้ สปาย กาญจน์ซาดิสม์สแควร์ ซีเรียส ภคันทลาพาธ ซัมเมอร์คอนเทนเนอร์ จูเนียร์เซ็กซ์มาเฟียวันเวย์สะเด่า แอ็คชั่น อุปัทวเหตุ ครัวซองต์ฮ็อตด็อกฟยอร์ดแชมปิยอง </p>
                    </motion.div>
                    
                </div>
            </section>
        </motion.div>


    )
}
