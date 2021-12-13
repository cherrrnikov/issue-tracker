const createIssue = function () {
    let issues = JSON.parse(localStorage.getItem("issues"));
    const issuesList = document.getElementById("issuesList");

    issuesList.innerHTML = ``;

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id,
            description = issues[i].description,
            severity = issues[i].severity,
            assignedTo = issues[i].assignedTo,
            status = issues[i].status;

        issuesList.innerHTML += `
        <div>
            <h6>Issue ID: ${id}</h6>
            <p>
                <span>${status}</span>
            </p>
            <h3>${description}</h3>
            <p>
                <span>
                    ${severity}
                </span>
            </p>
            <p>
                <span>
                    ${assignedTo}
                </span>
            </p>
            <a href="#">Close</a>
            <a href="#">Delete</a>
        </div>
        `;
    }
};
const saveIssue = function (e) {
    // In localStorage
    const issueDescription = document.getElementById("issueDescInput").value,
        issueSeverity = document.getElementById("issueSeverityInput").value,
        issueAssignedTo = document.getElementById("issueAssignedToInput").value;

    let issueID = chance.guid();
    let issueStatus = "Open";

    let issue = {
        id: issueID,
        status: issueStatus,
        description: issueDescription,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
    };

    if (localStorage.getItem("issues") === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem("issues"));
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
    }

    document.getElementById("issueForm").reset();
    createIssue();
    e.preventDefault();
};

document.getElementById("issueForm").addEventListener("submit", saveIssue);
document.addEventListener("DOMContentLoaded", createIssue);
