import React from 'react';

const ApplicationCard = ({ app, onApprove, onReject }) => {
    return (
        <div className="application-card">
            <h3>{app.pet.name} ({app.pet.type})</h3>
            <p>Applicant: {app.applicant}</p>
            <p>Status: <span className={app.status}>{app.status}</span></p>
            {app.status === 'PENDING' && (
                <div>
                    <button className="approve" onClick={onApprove} style={{ marginRight: '10px' }}>
                        Approve
                    </button>
                    <button className="reject" onClick={onReject}>
                        Reject
                    </button>
                </div>
            )}
        </div>
    );
};

export default ApplicationCard;
