import { useState, useEffect } from "react";
import { Jobs } from "../types";

const useJobsAPI = (): Jobs[] => {
  const [jobsData, setJobsData] = useState<Jobs[]>([]);

  useEffect(() => {
    fetch("https://www.zippia.com/api/jobs/", {
        method: "POST", 
        body: JSON.stringify({
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "Business Analyst",
            "locations": [],
            "numJobs": 20,
            "previousListingHashes": []
        }),
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
      .then((res) => res.json())
      .then((jobsData) => setJobsData(jobsData.jobs.slice(0, 10)));
  }, []);

  return jobsData;
};

export default useJobsAPI;

