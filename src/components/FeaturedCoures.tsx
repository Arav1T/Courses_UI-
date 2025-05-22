'use client'
import Link from 'next/link'
import courseData from '../data/music_courses.json'
import { BackgroundGradient } from './ui/background-gradient'

interface Course{
    id:number,
    title:string,
    slug:string,
    description:string,
    price:number,
    instructor:string,
    isFeatured:boolean
}
export default function FeaturedCoures() {
    const featuredCourses = courseData.courses.filter((course:Course)=>course.isFeatured)
    

  return (
    <div className='py-12 bg-gray-900'>
<div className='text-center'>
    <h2 className='text-base'>FEATURED COURSES</h2>
    <p>Learn with the Best</p>
     </div>
<div className='mt-10'>
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
{featuredCourses.map((course:Course)=>(
    <div className="flex justify-center" key={course.id}>
<BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 overflow-hidden flex flex-col h-full ">
<div className=" flex flex-col items-center text-center flex-grow">
                                <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">{course.title}</p>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">{course.description}</p>
                                <Link href={`/courses/${course.slug}`}>
                                Learn More
                                </Link>
                            </div>
</BackgroundGradient>

    </div>
))}
    </div>

</div>
<div className='mt-20 text-center'>
<Link href={'/courses'} className='bg-gradient-to-br hover:shadow-2xl hover:shadow-green-200 from-black p-2 rounded-2xl  to-sky-500'>
View All Coursess
</Link>
</div>

    </div>
  )
}
