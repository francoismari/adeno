import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getRankings = async (locale) => {
  try {

    console.log('GETTINGS TOP RESULTS')

    // Reference to the 'rankings' collection
    const rankingsRef = collection(db, "rankings");

    // Create a query against the collection
    const q = query(
      rankingsRef,
      where("locale", "==", locale),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if we got any results
    if (querySnapshot.empty) {
      console.log("No matching rankings found.");
      return null;
    }

    // Assuming we're interested in the first (and only) doc in results
    const latestRanking = querySnapshot.docs[0].data();
    latestRanking.id = querySnapshot.docs[0].id; // Include the document ID if needed

    return latestRanking;
  } catch (error) {
    console.error("Error fetching rankings:", error);
    throw error;
  }
};

export default getRankings;
