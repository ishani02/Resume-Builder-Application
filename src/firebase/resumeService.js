import { db } from "./fbconfig";

// save resume data to firestore
export const saveResumeData = (userId, resumeData) => {
    return db.collection("resumes").doc(userId).set({
        contactDetails: resumeData.contactDetails || {},
        educationDetails: resumeData.educationDetails || {},
        skillsDetails: resumeData.skillsDetails || {},
        skinCode: resumeData.skinCode || "skin1",
        updatedAt: new Date()
    }, { merge: true }).catch((error) => {
        console.error("Failed to save resume data:", error);
        throw error;
    }); // merge:true so we don't overwrite everything
}

// save basic user profile data
export const saveUserProfile = (userDetails) => {
    if (!userDetails || !userDetails.uid) return;
    return db.collection("users").doc(userDetails.uid).set({
        uid: userDetails.uid,
        displayName: userDetails.displayName || "",
        email: userDetails.email || "",
        lastLogin: new Date()
    }, { merge: true });
}

// load resume data from firestore
export const loadResumeData = async (userId) => {
    const doc = await db.collection("resumes").doc(userId).get();
    if (doc.exists) {
        return doc.data();
    }
    return null; // no data found for this user
}
