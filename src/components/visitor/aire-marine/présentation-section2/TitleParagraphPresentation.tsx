import React from 'react'

type titledescription  = {
    title: any;
    description: any[];
    image : any;

} ;
interface ImageAireMarineProps{
    doc: titledescription[];

}
const TitleParagraphPrersentation : React.FC<ImageAireMarineProps> = ({ doc }) => { 
    return (
            <div className=''>
                {
                    doc.map(lineDescription=>(
                        <div className='flex flex-col'>
                            <div className='mt-10 flex items-center gap-4 '>
                                <div><img src="/images/aire_marines/presentation/eclipse.png" alt="" /></div>
                                <div><p className='text-[25px] md:text-[28px]'></p>{lineDescription.title}</div>
                            </div>

                            <div className='flex flex-col gap-6 mt-4'>
                            
                                <p className='text-[18px] md:text-[20px] flex flex-col gap-3'>                                    {    
                                        lineDescription.description.map(descriptionParagraph=>(
                                                descriptionParagraph
                                        )) 
                                    }
                                </p>
                            
                                
                               
                            </div>
                            <div className='mt-10'>{lineDescription.image}</div>

                        </div>
                    ))
                }
            </div>
       
    )
}
export default TitleParagraphPrersentation ; 