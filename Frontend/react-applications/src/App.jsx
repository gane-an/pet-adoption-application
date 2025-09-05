import React, { useEffect, useState } from 'react';
import api from './api/axios';
import ApplicationCard from './components/ApplicationCard';

const App = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            const res = await api.get('/applications');
            setApplications(res.data);
        } catch (err) {
            console.error('Failed to fetch applications:', err);
        } finally {
            setLoading(false);
        }
    };

    // Pass the full application object to get the correct pet owner
    const handleApprove = async (app) => {
        try {
            await api.put(`/applications/${app.id}/approve`, null, {
                params: { owner: app.pet.owner } // dynamically use pet owner
            });
            fetchApplications(); // refresh list
        } catch (err) {
            console.error(err);
            alert(err.response?.data || 'Error approving');
        }
    };

    const handleReject = async (app) => {
        try {
            await api.put(`/applications/${app.id}/reject`, null, {
                params: { owner: app.pet.owner } // dynamically use pet owner
            });
            fetchApplications(); // refresh list
        } catch (err) {
            console.error(err);
            alert(err.response?.data || 'Error rejecting');
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '600px', margin: '20px auto' }}>
            <h1>My Applications</h1>
            {applications.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                applications.map(app => (
                    <ApplicationCard
                        key={app.id}
                        app={app}
                        onApprove={() => handleApprove(app)}
                        onReject={() => handleReject(app)}
                    />
                ))
            )}
        </div>
    );
};

export default App;
