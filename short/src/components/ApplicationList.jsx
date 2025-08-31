const ApplicationList = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return <p>No applications available.</p>;
  }

  return (
    <div>
      {applications.map((app) => (
        <div key={app.id} className="bg-white p-4 mb-4 rounded-xl shadow">
          <p>
            Pet: <b>{app.pet?.name}</b> (ID: {app.pet?.id})
          </p>
          <p>Applicant: {app.applicant}</p>
          <p>Status: <b>{app.status}</b></p>
        </div>
      ))}
    </div>
  );
};

export default ApplicationList;
