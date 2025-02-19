export const saveQuizHistory = (score) => {
    if (!window.indexedDB) {
      console.log("IndexedDB is not supported");
      return;
    }
  
    const request = indexedDB.open("quizHistory", 1);1
  
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
    };
  
    request.onsuccess = (e) => {
      const db = e.target.result;
      const transaction = db.transaction("history", "readwrite");
      const store = transaction.objectStore("history");
      store.add({ score, timestamp: new Date() });
  
      transaction.oncomplete = () => {
        console.log("Quiz history saved");
      };
    };
  
    request.onerror = (e) => {
      console.error("Error saving quiz history", e.target.error);
    };
  };
  