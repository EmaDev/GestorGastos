import { ToggleTheme } from "../../ui/components/ToggleTheme";
import logo from "../../assets/logo.svg";
interface Props {
    children: any;
}
export const BaseLayout = ({ children }: Props) => {
    return (
        <main className="min-h-[100vh] w-full bg-primary flex justify-center items-center">
            <div className='w-full'>
                <div className="flex justify-center px-6 py-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex border border-border rounded-lg shadow shadow-xl">
                        <div className="w-full h-auto bg-accent hidden lg:block lg:w-5/12 bg-cover rounded-l-lg p-6 
                        ">
                            <ToggleTheme />
                            <div className="flex items-center justify-center h-[80%] w-3/4 m-auto">
                                <img src={logo}/>
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12 bg-secondary p-5 rounded-lg lg:rounded-l-none">
                            {children}

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
