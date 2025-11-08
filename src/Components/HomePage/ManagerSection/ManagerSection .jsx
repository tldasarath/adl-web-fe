// components/ManagerSection.jsx
import Container from '@/Components/Common/Container';
import Image from 'next/image';

const ManagerSection = () => {

    return (
        <section className=" relative h-auto md:h-[800px]  py-8 md:py-14 ">
            <div className="absolute left-[-10px] top-[30%] -translate-y-1/2 pointer-events-none select-none ">
                <Image
                    src="/assets/images/bg/squares2.png"
                    alt="Decorative shapes"
                    width={240}
                    height={320}
                    className="object-contain md:w-60 w-36"
                />
            </div>

            {/* Bottom Right Decorative Shape */}
            <div className="absolute overflow-hidden right-0 bottom-[-10px] pointer-events-none select-none  -z-10">
                <Image
                    src="/assets/images/bg/square3.png"
                    alt="Decorative shapes"
                    width={240}
                    height={320}
                    className="object-contain md:w-60 w-40"
                />
            </div>
            <Container>
                <div className="w-full  rounded-lg  overflow-hidden ">
                    {/* Image Section */}
                    <div className='flex justify-center'>
                        <div className="relative h-60 w-60  md:h-96 md:w-96">
                            <Image
                                src="/assets/images/team/person1.png"
                                alt="ADIL MUHAMMED"
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>

                    {/* Name and Position Section */}
                    <div className="p-4 md:p-6 text-center">
                        <h3 className=" text-xl lg:text-2xl font-semibold text-[#E9C05F] mb-2">ADIL MUHAMMED</h3>
                        <p className="text-lg lg:text-xl  font-medium mb-4">Managing Director</p>

                        {/* Divider */}
                        <div className="w-16 h-1 bg-blue-500 mx-auto mb-4"></div>

                        {/* Description Section */}
                        <div className=" ">
                            <p className="text-md lg:text-xl font-light leading-relaxed">
                                With years of proven expertise in UAE business setup and government documentation services, I have supported hundreds of entrepreneurs and investors in establishing their businesses successfully in the UAE. At ADL Business Solutions, we don’t just process documents  we build foundations for your success.
                                Me and my dedicated team ensure end-to-end support, from choosing the right license to securing visas, banking, and operational approvals. Your vision is our priority, and we are committed to turning your business dream into reality with trust, transparency, and excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ManagerSection;