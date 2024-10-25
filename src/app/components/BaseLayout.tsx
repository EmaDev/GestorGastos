import { SideBar } from './SideBar'

interface Props {
    children: any
}
export const BaseLayout = ({ children }: Props) => {
    return (
        <>
            <main className='md:flex flex-row gap-6 bg-primary w-full min-h-[100vh] text-textPrimary'>
                <SideBar />
                <article className='w-full md:w-3/4 p-4 md:p-12 md:m-auto max-w-[1000px]'>
                    {children}
                </article>
            </main>
        </>
    )
}
