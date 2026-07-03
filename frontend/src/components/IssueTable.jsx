import { useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import StatusBadge from "./StatusBadge";
import ConfirmDialog from "./ConfirmDialog";

function IssueTable({
    issues = [],
    mode = "pending",
    refresh
}) {

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogType, setDialogType] = useState("");
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [loading, setLoading] = useState(false);

    function openResolve(issue) {
        setSelectedIssue(issue);
        setDialogType("resolve");
        setDialogOpen(true);
    }

    function openReject(issue) {
        setSelectedIssue(issue);
        setDialogType("reject");
        setDialogOpen(true);
    }

    async function handleConfirm(value) {
        try {
            setLoading(true);

            if (dialogType === "resolve") {
                await api.put(
                    `/government/resolve/${selectedIssue.id}`,
                    {
                        resolution_notes: value
                    }
                );
            }

            else if (dialogType === "reject") {
                await api.put(
                    `/government/reject/${selectedIssue.id}`,
                    {
                        resolution_notes: value
                    }
                );
            }

            setDialogOpen(false);
            if (refresh) refresh();

        } catch (err) {
            console.error(err);
            alert("Operation failed.");
        } finally {
            setLoading(false);
        }
    }

    async function startWork(issue) {
        try {
            setLoading(true);

            await api.put(
                `/government/status/${issue.id}`,
                {
                    status: "In Progress"
                }
            );

            if (refresh) refresh();

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">

                        <thead className="bg-slate-100">
                            <tr>
                                <th className="px-6 py-4 text-left">ID</th>
                                <th className="px-6 py-4 text-left">Title</th>
                                <th className="px-6 py-4 text-left">Parastatal / Institution</th>
                                <th className="px-6 py-4 text-left">Severity</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Officer</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {issues.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-16 text-slate-500">
                                        No issues found.
                                    </td>
                                </tr>
                            ) : (
                                issues.map(issue => (
                                    <tr key={issue.id} className="border-t hover:bg-slate-50">

                                        <td className="px-6 py-5">#{issue.id}</td>

                                        <td className="px-6 py-5">
                                            <div>
                                                <h3 className="font-semibold">
                                                    {issue.title}
                                                </h3>
                                                <p className="text-sm text-slate-500 truncate max-w-sm">
                                                    {issue.description}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            {issue.department}
                                        </td>

                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                issue.severity === "High"
                                                    ? "bg-red-100 text-red-700"
                                                    : issue.severity === "Medium"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}>
                                                {issue.severity}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5">
                                            <StatusBadge status={issue.status} />
                                        </td>

                                        <td className="px-6 py-5">
                                            {issue.assigned_to || "-"}
                                        </td>

                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-2 justify-center">

                                                <Link
                                                    to={`/admin/issue/${issue.id}`}
                                                    className="bg-slate-700 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition"
                                                >
                                                    View
                                                </Link>

                                                {mode === "department" && (
                                                    <>
                                                        {issue.status === "Pending" && (
                                                            <button
                                                                onClick={() => startWork(issue)}
                                                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition"
                                                            >
                                                                Start Work
                                                            </button>
                                                        )}

                                                        {issue.status === "In Progress" && (
                                                            <>
                                                                <button
                                                                    onClick={() => openResolve(issue)}
                                                                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                                                                >
                                                                    Resolve
                                                                </button>

                                                                <button
                                                                    onClick={() => openReject(issue)}
                                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                                                                >
                                                                    Reject
                                                                </button>
                                                            </>
                                                        )}
                                                    </>
                                                )}

                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>

            <ConfirmDialog
                open={dialogOpen}
                title={
                    dialogType === "resolve"
                        ? "Resolve Issue"
                        : "Reject Issue"
                }
                message={
                    dialogType === "resolve"
                        ? "Describe how the issue was resolved."
                        : "Enter the reason for rejecting this issue."
                }
                placeholder={
                    dialogType === "resolve"
                        ? "Resolution notes..."
                        : "Reason for rejection..."
                }
                confirmText={
                    loading
                        ? "Please wait..."
                        : dialogType === "resolve"
                        ? "Resolve"
                        : "Reject"
                }
                onCancel={() => setDialogOpen(false)}
                onConfirm={handleConfirm}
            />
        </>
    );
}

export default IssueTable;
