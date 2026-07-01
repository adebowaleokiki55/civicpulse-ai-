import { motion } from "framer-motion";

function StatCard({

    title,

    value,

    color,

    icon

}) {

    return (

        <motion.div

            whileHover={{

                scale: 1.03,

                y: -4

            }}

            className={`${color} rounded-2xl p-6 shadow-xl text-white`}

        >

            <div className="flex justify-between">

                <div>

                    <p className="opacity-80">

                        {title}

                    </p>

                    <h1 className="text-5xl font-bold mt-4">

                        {value}

                    </h1>

                </div>

                <div className="text-5xl opacity-60">

                    {icon}

                </div>

            </div>

        </motion.div>

    );

}

export default StatCard;