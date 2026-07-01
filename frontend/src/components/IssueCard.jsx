import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

function IssueCard({ issue }) {

    return (

        <div className="issue-card">

            <div className="issue-header">

                <h3>

                    {issue.title}

                </h3>

                <StatusBadge status={issue.status} />

            </div>

            <p>

                {issue.description}

            </p>

            <div className="issue-footer">

                <span>

                    {issue.department}

                </span>

                <span>

                    {issue.severity}

                </span>

            </div>

            <Link to={`/issue/${issue.id}`}>

                View Details →

            </Link>

        </div>

    );

}

export default IssueCard;
