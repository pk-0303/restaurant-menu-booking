import { collection, doc, setDoc, updateDoc, onSnapshot, query, where, serverTimestamp, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export interface OrderItem {
  id: string;
  en: string;
  mr: string;
  price: number;
  quantity: number;
}

export interface Order {
  id?: string;
  tableNo: string;
  waiterName: string;
  status: 'open' | 'paid';
  items: OrderItem[];
  createdAt: any;
  updatedAt: any;
}

export const subscribeToOpenOrders = (callback: (orders: Order[]) => void) => {
  const q = query(collection(db, 'orders'), where('status', '==', 'open'));
  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() } as Order);
    });
    // Sort client-side to avoid composite index requirement
    orders.sort((a, b) => {
      const timeA = a.updatedAt?.toMillis() || 0;
      const timeB = b.updatedAt?.toMillis() || 0;
      return timeB - timeA;
    });
    callback(orders);
  }, (error) => {
    console.error("Error fetching orders:", error);
  });
};

export const createOrUpdateOrder = async (tableNo: string, waiterName: string, items: OrderItem[]) => {
  // Check if there's an open order for this table
  const q = query(collection(db, 'orders'), where('tableNo', '==', tableNo), where('status', '==', 'open'));
  const snapshot = await getDocs(q);
  
  if (!snapshot.empty) {
    // Update existing order
    const orderDoc = snapshot.docs[0];
    const existingData = orderDoc.data() as Order;
    
    // Merge items
    const mergedItems = [...existingData.items];
    items.forEach(newItem => {
      const existingItemIndex = mergedItems.findIndex(i => i.id === newItem.id);
      if (existingItemIndex >= 0) {
        mergedItems[existingItemIndex].quantity += newItem.quantity;
      } else {
        mergedItems.push(newItem);
      }
    });

    await updateDoc(doc(db, 'orders', orderDoc.id), {
      items: mergedItems,
      waiterName, // Update waiter name in case a different waiter adds to it
      updatedAt: serverTimestamp()
    });
    return orderDoc.id;
  } else {
    // Create new order
    const newOrderRef = doc(collection(db, 'orders'));
    await setDoc(newOrderRef, {
      tableNo,
      waiterName,
      status: 'open',
      items,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return newOrderRef.id;
  }
};

export const markOrderAsPaid = async (orderId: string) => {
  await updateDoc(doc(db, 'orders', orderId), {
    status: 'paid',
    updatedAt: serverTimestamp()
  });
};
