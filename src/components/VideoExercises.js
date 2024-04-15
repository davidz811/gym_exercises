import React from 'react'


export const VideoExercises = ({ exerciseVideos, name }) => {
    // console.log(exerciseVideos)
    // console.log(name)
    return (
        <div className='w-full'>
            <div>
                <p className='text-3xl font-semibold mx-4'>Watch <span className='text-[#FF2625]'>{name}</span> exercise video</p>
            </div>
            <div className='grid grid-cols-3 py-10'>
                {exerciseVideos?.contents?.slice(1, 4).map((item, index) => (
                    <div>
                        <a
                            key={index}
                            href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                        >
                            <div className='flex justify-center'>
                                <img src={item.video.thumbnails[0].url} className='w-96' />
                            </div>
                        </a>
                        <div className='text-center my-3 max-w-[450px]'>
                            <p className='font-serif text-xl'>{item.video.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    )
}
