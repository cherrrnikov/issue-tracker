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
        <div class="issue">
            <h6 class="issue-id">Issue ID: ${id}</h6>
            <p class="issue-status">
                <span>${status}</span>
            </p>
            <h3 class="issue-description">${description}</h3>
            <p class="issue-severity">
                <span>
                    ${severity}
                </span>
            </p>
            <p class="issue-assigned">
                <span>
                    ${assignedTo}
                </span>
            </p>
            <button id="closedStatus" onclick="setStatusClosed('${id}')" class="issue-btn">Close</button>
            <button id="deleteIssue" onclick="deleteIssue('${id}')" class="issue-btn">Delete</button>
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

const setStatusClosed = function (id) {
    let issues = JSON.parse(localStorage.getItem("issues"));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues[i].status = "Closed";
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    createIssue();
};
const deleteIssue = function (id) {
    let issues = JSON.parse(localStorage.getItem("issues"));

    for (let i = 0; i < issues.length; i++) {
        if (issues[i].id === id) {
            issues.splice(i, 1);
        }
    }

    localStorage.setItem("issues", JSON.stringify(issues));
    createIssue();
};

document.getElementById("issueForm").addEventListener("submit", saveIssue);
document.addEventListener("DOMContentLoaded", createIssue);
