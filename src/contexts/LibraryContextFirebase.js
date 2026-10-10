import { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { addDays, isAfter, differenceInDays } from 'date-fns';

const LibraryContext = createContext();

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

export const LibraryProvider = ({ children }) => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener for materials
  useEffect(() => {
    const materialsRef = collection(db, 'materials');
    
    const unsubscribe = onSnapshot(materialsRef, (snapshot) => {
      const materialsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamps back to Date objects
        dueDate: doc.data().dueDate?.toDate() || null
      }));
      setMaterials(materialsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching materials:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const searchMaterials = (query) => {
    if (!query) return materials;

    const searchTerm = query.toLowerCase();
    return materials.filter(material =>
      material.title.toLowerCase().includes(searchTerm) ||
      material.author.toLowerCase().includes(searchTerm) ||
      (material.isbn && material.isbn.includes(searchTerm)) ||
      material.callNumber.toLowerCase().includes(searchTerm)
    );
  };

  const checkOutMaterial = async (materialId, userEmail) => {
    try {
      const materialRef = doc(db, 'materials', materialId);
      await updateDoc(materialRef, {
        available: false,
        checkedOutBy: userEmail,
        dueDate: addDays(new Date(), 21)
      });
    } catch (error) {
      console.error('Error checking out material:', error);
      throw error;
    }
  };

  const returnMaterial = async (materialId) => {
    try {
      const material = materials.find(m => m.id === materialId);
      if (!material) return null;

      const isLate = material.dueDate && isAfter(new Date(), material.dueDate);
      const lateFee = isLate ? differenceInDays(new Date(), material.dueDate) * 0.5 : 0;

      const materialRef = doc(db, 'materials', materialId);
      await updateDoc(materialRef, {
        available: true,
        checkedOutBy: null,
        dueDate: null,
        reservedBy: []
      });

      return { isLate, lateFee };
    } catch (error) {
      console.error('Error returning material:', error);
      throw error;
    }
  };

  const renewMaterial = async (materialId) => {
    try {
      const material = materials.find(m => m.id === materialId);
      if (material && material.reservedBy.length === 0) {
        const materialRef = doc(db, 'materials', materialId);
        await updateDoc(materialRef, {
          dueDate: addDays(new Date(), 21)
        });
      }
    } catch (error) {
      console.error('Error renewing material:', error);
      throw error;
    }
  };

  const reserveMaterial = async (materialId, userEmail) => {
    try {
      const material = materials.find(m => m.id === materialId);
      if (material) {
        const materialRef = doc(db, 'materials', materialId);
        await updateDoc(materialRef, {
          reservedBy: [...material.reservedBy, userEmail]
        });
      }
    } catch (error) {
      console.error('Error reserving material:', error);
      throw error;
    }
  };

  const cancelReservation = async (materialId, userEmail) => {
    try {
      const material = materials.find(m => m.id === materialId);
      if (material) {
        const materialRef = doc(db, 'materials', materialId);
        await updateDoc(materialRef, {
          reservedBy: material.reservedBy.filter(email => email !== userEmail)
        });
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      throw error;
    }
  };

  const addMaterial = async (materialData) => {
    try {
      const newMaterial = {
        ...materialData,
        available: true,
        checkedOutBy: null,
        dueDate: null,
        reservedBy: []
      };
      await addDoc(collection(db, 'materials'), newMaterial);
    } catch (error) {
      console.error('Error adding material:', error);
      throw error;
    }
  };

  const updateMaterial = async (materialId, updates) => {
    try {
      const materialRef = doc(db, 'materials', materialId);
      await updateDoc(materialRef, updates);
    } catch (error) {
      console.error('Error updating material:', error);
      throw error;
    }
  };

  const deleteMaterial = async (materialId) => {
    try {
      const material = materials.find(m => m.id === materialId);
      if (material && material.available) {
        const materialRef = doc(db, 'materials', materialId);
        await deleteDoc(materialRef);
      }
    } catch (error) {
      console.error('Error deleting material:', error);
      throw error;
    }
  };

  const value = {
    materials,
    loading,
    searchMaterials,
    checkOutMaterial,
    returnMaterial,
    renewMaterial,
    reserveMaterial,
    cancelReservation,
    addMaterial,
    updateMaterial,
    deleteMaterial
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};
