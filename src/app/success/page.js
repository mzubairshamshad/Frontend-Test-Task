import React from 'react';

const SuccessPage = () => {
    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <form className="w-full max-w-[1000px]" >
                <div className="rounded-md px-7 py-4 bg-white ">
                    <div className="">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">My form</h2>

                        <h3 className="text-gray-500 text-3xl font-bold text-center py-60">
                            Thanks for submitting the form!
                        </h3>

                    </div>
                </div>
            </form>
        </main>
    );
};

export default SuccessPage;