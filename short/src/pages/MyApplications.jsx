import { useEffect, useState } from "react";
import { getMyApplications } from ".../services/applicationService";
import ApplicationList from ".../components/ApplicationList";

const MyApplications = () => {
  const [apps, setApps] = useState([]);
  const applicant = localStorage.getItem("username") || "guest";

  useEffect(() => {
    getMyApplications(applicant).then((res) => setApps(res.data));
  }, [applicant]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
      <ApplicationList applications={apps} />
    </div>
  );
};

export default MyApplications;
