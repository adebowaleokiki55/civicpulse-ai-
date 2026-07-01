function StatusBadge({ status }) {

    const styles = {

        Pending:
            "bg-yellow-100 text-yellow-700",

        Assigned:
            "bg-blue-100 text-blue-700",

        "In Progress":
            "bg-purple-100 text-purple-700",

        Resolved:
            "bg-green-100 text-green-700",

        Rejected:
            "bg-red-100 text-red-700"

    };

    return (

        <span

            className={`

                px-4

                py-2

                rounded-full

                text-sm

                font-semibold

                ${styles[status] || "bg-gray-100 text-gray-700"}

            `}

        >

            {status}

        </span>

    );

}

export default StatusBadge;