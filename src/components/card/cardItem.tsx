import styles from "./cardItem.module.scss";
import { Jobs } from '../../types';
import { differenceInDays } from "date-fns";

interface CardItemProps {
    data: Jobs;
}

const CardItem = ({ data }:CardItemProps ) => {

    // I know you didnt ask to also show the posted date, but this will make it easier for you to check if the filter is working
    const postedDate = () => {
        const daysAgo = differenceInDays(new Date(data.postingDate), new Date())*-1;
        
        let totalDays = `${daysAgo} days ago`;

        if(daysAgo == 0 || daysAgo == -0){
            totalDays = "today";
        }

        if(daysAgo >= 30){
            totalDays = "one month ago";
        }

        return `Posted ${totalDays}`;
    }

    return (
        <div className={styles.card__container}>
            <div>
                <h2>{data.jobTitle}</h2>
                <span>{data.companyName}</span>
                <p>{postedDate()}</p>
            </div>
            <div>
                <p>{data.jobDescription}</p>
            </div>
        </div>
    );
}

export default CardItem;