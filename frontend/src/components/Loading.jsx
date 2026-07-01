import { FiLoader } from "react-icons/fi";

function Loading() {

    return (

        <div className="flex justify-center items-center min-h-[70vh]">

            <div className="bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">

                <FiLoader

                    className="text-6xl text-blue-600 animate-spin"

                />

                <h2 className="mt-6 text-2xl font-bold text-slate-800">

                    Loading...

                </h2>

                <p className="mt-2 text-slate-500">

                    Please wait while we fetch the latest data.

                </p>

            </div>

        </div>

    );

}

export default Loading;