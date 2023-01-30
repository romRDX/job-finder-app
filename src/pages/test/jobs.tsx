import React, { useState, useMemo } from 'react';
import useJobsAPI from '../../hooks/useJobsAPI';
import styles from "./jobsPage.module.scss";
import Image from 'next/image'
import CardItem from "../../components/card/cardItem";
import debounce from "../../utils/debounce";
import { differenceInDays } from 'date-fns';
import { Jobs } from '../../types';
import Link from 'next/link';

import BurgerMenu from "../../components/burgerMenu/burgerMenu";

const JobsPage = () => {

  // getting the jobs list from a custom hook
  const jobsData = useJobsAPI();

  // state for the filter of the search input
  const[filter, setFilter] = useState<string>("");

  // state to track the last 7 days jobs filter
  const[sevenDaysFilter, setSevenDaysFilter] = useState<boolean>(false);

  // handling the onChange event of the search input
  const handleOnType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value)
  }

  // creating a debounced function so the page will wait the user finish typing
  const debouncedOnType = debounce(handleOnType, 1000);

  // using useMemo to improve performance while the user is using the search field to find a job
  const filteredJobs = useMemo<Jobs[]>(() => {
    // I tried to make the code more readable here and on the second return, could have used the ternary operator and use less lines, but then it would beharder to read and debug.
    if(sevenDaysFilter){
      const sevenLastDaysJobs = jobsData.filter((job) => differenceInDays(new Date(job.postingDate), new Date()) >= -7);
      return sevenLastDaysJobs?.filter((job) => job.jobTitle.toLowerCase().includes(filter.toLowerCase()) || job.companyName.toLowerCase().includes(filter.toLowerCase()));  
    }
    
    // doing the filtering based on what the user typed on the search input
    return jobsData?.filter((job) => job.jobTitle.toLowerCase().includes(filter.toLowerCase()) || job.companyName.toLowerCase().includes(filter.toLowerCase()));
  }, [jobsData, filter, sevenDaysFilter]);

  return (
    <>
      <header className={styles.jobs__header}>
        <Image
          src="/zippia-logo.png"
          alt="Zippia logo"
          width={152}
          height={36}
        />

        <div className={styles.jobs__searchInputs}>
          <input placeholder='Search for Job Titles or Company names' onChange={debouncedOnType} />
          <button className={styles.jobs__search}>
            <img src='/new-search.svg' />
          </button>
        </div>

        <BurgerMenu />
        
      </header>
      <div className={styles.jobs__container}>
        <h1>DEVELOPER JOBS NEAR ME</h1>

        <div className={styles.jobs__listOptions}>
          <div onClick={() => setSevenDaysFilter(prev => !prev)} className={sevenDaysFilter ? styles["jobs__filter--active"] : styles.jobs__filter}>Last 7 days positions</div>
        </div>

        <ul className={styles.jobs__jobsList}>
          {
            filteredJobs?.map((job) => (
              <CardItem key={job.jobId} data={job} />
            ))
          }
        </ul>
      </div>
    </>
  )
};

export default JobsPage;
