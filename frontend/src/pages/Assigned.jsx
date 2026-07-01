import { useEffect, useState } from "react";

import api from "../services/api";

import Loading from "../components/Loading";
import IssueTable from "../components/IssueTable";

function Assigned() {

    const [loading, setLoading] = useState(true);

    const [issues, setIssues] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadIssues();

    }, []);

    async function loadIssues() {

        try {

            const response = await api.get("/government/assigned");

            setIssues(response.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    }

    async function startWork(issueId) {

        try {

            await api.put(

                `/government/status/${issueId}`,

                {

                    status: "In Progress"

                }

            );

            loadIssues();

        }

        catch (err) {

            console.log(err);

        }

    }

    const filtered = issues.filter(issue =>

        issue.title.toLowerCase().includes(search.toLowerCase())

    );

    if (loading)

        return <Loading />;

    return (

        <div>

            <div className="flex justify-between items-center mb-8">

                <div>

                    <h1 className="text-4xl font-bold">

                        Assigned Issues

                    </h1>

                    <p className="text-slate-500">

                        Officers can begin working on assigned reports.

                    </p>

                </div>

                <input

                    className="border rounded-xl px-5 py-3 w-80"

                    placeholder="Search..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />

            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-slate-100">

                        <tr>

                            <th className="p-5 text-left">

                                ID

                            </th>

                            <th className="p-5 text-left">

                                Title

                            </th>

                            <th className="p-5 text-left">

                                Officer

                            </th>

                            <th className="p-5 text-left">

                                Department

                            </th>

                            <th className="p-5 text-left">

                                Action

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.map(issue=>(

                                <tr

                                    key={issue.id}

                                    className="border-b"

                                >

                                    <td className="p-5">

                                        #{issue.id}

                                    </td>

                                    <td className="p-5 font-semibold">

                                        {issue.title}

                                    </td>

                                    <td className="p-5">

                                        {issue.assigned_to}

                                    </td>

                                    <td className="p-5">

                                        {issue.department}

                                    </td>

                                    <td className="p-5 flex gap-3">

                                        <button

                                            onClick={()=>startWork(issue.id)}

                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"

                                        >

                                            Start Work

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Assigned;